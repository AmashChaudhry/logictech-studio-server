import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import routes from '../server/routes.js';
import { privateIP } from '../helpers/private-ip.js';
import { connectMongodb } from '../lib/mongodb-config.js';

dotenv.config();
connectMongodb();

const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: process.env.ORIGIN_URL,
    methods: ['GET', 'POST'],
    credentials: true,
}));

app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('LogicTech Studio');
});

routes(app);

app.listen(port, () => {
    console.log(`\nLocal:             http://localhost:${port}`);
    console.log(`On Your Network:   http://${privateIP()}:${port}\n`);
});