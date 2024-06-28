import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import productRouter from './routes/productRoutes'
import userRouter from './routes/userRoutes'

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
        process.exit(1); // Exit the process with failure
    });

const app = express();
app.use(express.json());
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);


const server = createServer(app);

server.listen(port, () => {
    console.log(`Serveer listening on port ${port}`)
});
server.on('error', (err: NodeJS.ErrnoException) => {
    console.error(`Server error: ${err}`)
})

// const requestListener = (req: IncomingMessage, res: ServerResponse) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('Hello from Bun TS!');
// };

// const server = createServer(requestListener);

// server.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
// });

// server.on('error', (err: NodeJS.ErrnoException) => {
//     console.error('Server error:', err);
// });
