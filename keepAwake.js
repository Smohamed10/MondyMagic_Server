// keepAwake.js
const cron = require('node-cron');
const http = require('http');

// Schedule a cron job to ping the website every 10 minutes
cron.schedule('*/13 * * * *', () => {
  // Ping the website
  http.get('https://www.mondymagic.com', (res) => {
    console.log(`Website ping response: ${res.statusCode}`);
  }).on('error', (err) => {
    console.error('Website ping error:', err);
  });
});
