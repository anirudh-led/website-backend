// server.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 5000;

let visitCount = 0;
const sessions = new Set(); // Track unique sessions

app.use(cors());
app.use(cookieParser());

// Endpoint to get the current visit count
app.get('/api/visit-count', (req, res) => {
  res.json({ count: visitCount });
});

// Endpoint to increment the visit count
app.post('/api/increment-count', (req, res) => {
  const sessionId = req.cookies.sessionId;

  if (!sessionId || !sessions.has(sessionId)) {
    // Generate a new session ID
    const newSessionId = Math.random().toString(36).substring(7);
    sessions.add(newSessionId);

    // Set the session ID as a cookie
    res.cookie('sessionId', newSessionId, { maxAge: 24 * 60 * 60 * 1000 }); // 1 day

    // Increment the visit count
    visitCount += 1;
  }

  res.json({ count: visitCount });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});