import dotenv from 'dotenv';
import http from 'http';
import app from './app';

dotenv.config();

const server = http.createServer(app);

const PORT = process.env.APP_PORT || 8080;

server.listen(PORT, () => console.log(`App running on port ${PORT} ...`));
