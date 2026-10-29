const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const clubRoutes = require('./routes/clubRoutes');

const app  = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: "hey, Backend's up!!"
    });
});

app.use('/api/clubs', clubRoutes);

module.exports = app;