import express from 'express';
import userRouter from './routes/users.js';
const app = express();

const server = app.listen(8080, () => {
    console.log('Server running');
});


app.use(express.json());
app.use('/api/usuarios', userRouter);
server.on('error', error => console.log(error));