require('dotenv').config();
const express = require('express');
const path = require('path');
const aiRoutes = require('./routes/ai.routes');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', aiRoutes);

app.use((err, req, res, next) => {
  logger.error('Unhandled error', err.message);
  res.status(500).json({ error: 'An unexpected error occurred' });
});

app.listen(PORT, () => {
  logger.info(`AI Fiesta Server is running on http://localhost:${PORT}`);
});
