const sqlite3 = require('sqlite3').verbose();

async function migrate() {
  const oldDb = new sqlite3.Database('dacha.db.bak');
  const newDb = new sqlite3.Database('dacha.db');

  const getRows = (db, query) => new Promise((resolve, reject) => {
    db.all(query, [], (err, rows) => err ? reject(err) : resolve(rows));
  });

  const runQuery = (db, query, params) => new Promise((resolve, reject) => {
    db.run(query, params, (err) => err ? reject(err) : resolve());
  });

  try {
    // 1. Migrate Users
    console.log('Migrating users...');
    const users = await getRows(oldDb, "SELECT * FROM user");
    for (const user of users) {
      const { id, name, surname, phone, verificationCode, isVerified, chatId } = user;
      await runQuery(newDb, 
        "INSERT OR IGNORE INTO user (id, name, surname, phone, verificationCode, isVerified, chatId) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [id, name, surname, phone, verificationCode, isVerified, chatId]
      );
    }

    // 2. Migrate Dachas
    console.log('Migrating dachas...');
    const dachas = await getRows(oldDb, "SELECT * FROM dachalar");
    for (const d of dachas) {
      // Note: we might need to handle column differences. 
      // Based on our history, we added 'updatedAt' recently.
      const columns = Object.keys(d).join(', ');
      const placeholders = Object.keys(d).map(() => '?').join(', ');
      const values = Object.values(d);
      
      await runQuery(newDb, 
        `INSERT OR IGNORE INTO dachalar (${columns}) VALUES (${placeholders})`,
        values
      );
    }

    console.log('Migration successful!');
  } catch (e) {
    console.error('Migration failed:', e.message);
  } finally {
    oldDb.close();
    newDb.close();
  }
}

migrate();
