import express from 'express'
import { router } from './Routes/user.route.js';
import env from 'dotenv';
import cors from 'cors'
import DBconnect from './Database/DBconnect.js';

env.config()

const server = express();
const PORT = process.env.PORT || 3001;
server.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Allow cookies if needed
}))
server.use(express.json());

(async () => {
    try {
        await DBconnect()
        server.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Database Connection Error', error.message)
    }
})()


server.use('/api', router)

server.use((error, request, response, next) => {
    response
        .status(error.statusCode || 500)
        .json({ message: error.message || 'Internal Server Error' })
    next()
})
