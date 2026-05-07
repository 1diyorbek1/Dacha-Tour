const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // Large limit for base64 images
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Database setup
const dbPath = path.resolve(__dirname, 'dacha.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to SQLite database');
    // Create table if not exists
    db.run(`
      CREATE TABLE IF NOT EXISTS dachalar (
        id TEXT PRIMARY KEY,
        dacha_name TEXT,
        owner_phone TEXT,
        owner_name TEXT,
        owner_surname TEXT,
        photos TEXT,
        calendar TEXT,
        amenities TEXT,
        created_at TEXT
      )
    `);
  }
});

// GET all dachalar
app.get('/api/dachalar', (req, res) => {
  db.all('SELECT * FROM dachalar', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // Parse JSON strings back to objects
    const dachalar = rows.map(row => ({
      id: row.id,
      owner: {
        dachaName: row.dacha_name,
        phone: row.owner_phone,
        ownerName: row.owner_name,
        ownerSurname: row.owner_surname
      },
      photos: JSON.parse(row.photos),
      calendar: JSON.parse(row.calendar),
      amenities: JSON.parse(row.amenities),
      createdAt: row.created_at
    }));
    res.json(dachalar);
  });
});

// POST new dacha
app.post('/api/dachalar', (req, res) => {
  const { id, owner, photos, calendar, amenities, createdAt } = req.body;
  
  const stmt = db.prepare(`
    INSERT INTO dachalar (id, dacha_name, owner_phone, owner_name, owner_surname, photos, calendar, amenities, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    id,
    owner.dachaName,
    owner.phone,
    owner.ownerName,
    owner.ownerSurname,
    JSON.stringify(photos),
    JSON.stringify(calendar),
    JSON.stringify(amenities),
    createdAt,
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id, message: 'Dacha saved successfully' });
    }
  );
  stmt.finalize();
});

// PUT update dacha
app.put('/api/dachalar/:id', (req, res) => {
  const { id } = req.params;
  const { owner, photos, calendar, amenities } = req.body;

  const stmt = db.prepare(`
    UPDATE dachalar 
    SET dacha_name = ?, owner_phone = ?, owner_name = ?, owner_surname = ?, photos = ?, calendar = ?, amenities = ?
    WHERE id = ?
  `);

  stmt.run(
    owner.dachaName,
    owner.phone,
    owner.ownerName,
    owner.ownerSurname,
    JSON.stringify(photos),
    JSON.stringify(calendar),
    JSON.stringify(amenities),
    id,
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Dacha updated successfully' });
    }
  );
  stmt.finalize();
});

// DELETE dacha
app.delete('/api/dachalar/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM dachalar WHERE id = ?', id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Dacha deleted successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
