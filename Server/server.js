import express from 'express'
import { router } from './Routes/user.route.js';
import env from 'dotenv';
import cors from 'cors'
import DBconnect from './Database/DBconnect.js';

env.config()

const server = express();
const PORT = process.env.PORT || 3001;

server.use(cors())
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


