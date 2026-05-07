const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('dacha.db');

db.run(
  "UPDATE settings SET holidayMode = 'newyear', holidayText = '2027' WHERE id = 'current'",
  [],
  (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Successfully updated holidayMode to newyear');
    }
    db.close();
  }
);
