import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import routes from './routes.js';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import { privateIP } from '../helpers/private-ip.js';
import { connectMongodb } from '../lib/mongodb-config.js';

let serverStartTime = Date.now();
const filename = fileURLToPath(import.meta.url);
const appDirectory = path.dirname(filename);

dotenv.config();
connectMongodb();

const app = express();
const port = process.env.PORT;

app.use(
    cors({
        origin: process.env.ORIGIN_URL,
        methods: ['GET', 'POST', 'PATCH'],
        credentials: true,
    })
);

app.use(cookieParser());

app.get('/server-start-time', (req, res) => {
    res.json({ startTime: serverStartTime });
});

app.use(
    '/layout',
    express.static(
        path.join(appDirectory, 'layout')
    )
);

app.get('/', (req, res) => {
    res.sendFile(
        path.join(appDirectory, 'layout/layout.html')
    );
});

routes(app);

app.listen(port, () => {
    console.log(`\nLocal:             http://localhost:${port}`);
    console.log(`On Your Network:   http://${privateIP()}:${port}\n`);
});