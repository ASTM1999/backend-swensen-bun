import { createServer, IncomingMessage, ServerResponse } from 'http';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const port = process.env.PORT || 3000;
const mongoUri = process.env.DATABASE_URL || '';

mongoose.connect(mongoUri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });


const requestListener = (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello from Bun TS!');
};

const server = createServer(requestListener);

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

server.on('error', (err: NodeJS.ErrnoException) => {
    console.error('Server error:', err);
});
