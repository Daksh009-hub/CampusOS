import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import clubRoutes from './routes/clubRoutes.js';

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

export default app;