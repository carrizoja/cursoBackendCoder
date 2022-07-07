import koa from 'koa';
import dotenv from 'dotenv';
import koaBody from 'koa-body';
import BooksRouter from './routers/books.router.js';



dotenv.config();

const app = new koa();

app.use(koaBody());
app.use(BooksRouter.routes());

app.use(async(ctx) => {
    ctx.body = 'Hello World';

})

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

server.on('error', (err) => {
    console.log(err);
})