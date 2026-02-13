require('dotenv').config();

module.exports = {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/exam_delivery',
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173'
};