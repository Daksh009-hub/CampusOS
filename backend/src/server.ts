import app from './app';
import dotenv from 'dotenv';
import { prisma } from './lib/prisma.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

async function main() {
    try {
        await prisma.$connect();
        console.log('Connected to the database');

        app.listen(PORT, () => {
            console.log(`backend running at port: ${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
}

main();