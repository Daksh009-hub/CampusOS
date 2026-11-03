
require('dotenv').config();

const dns = require('dns');

// Use public DNS servers to resolve MongoDB SRV records
dns.setServers(['1.1.1.1', '8.8.8.8']);

const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected successfully');

    // Start server only after successful DB connection
    app.listen(PORT, () => {
      console.log(`Backend running at port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
  });
