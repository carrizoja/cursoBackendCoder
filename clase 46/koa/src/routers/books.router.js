import Router from 'koa-router';

const router = new Router({
    prefix: '/api/books'

});

const books = [{
    id: 1,
    title: 'The Lord of the Rings',
    description: 'The Lord of the Rings is a high fantasy novel written by English author J. R. R. Tolkien. The story began as a sequel to Tolkien\'s 1937 fantasy novel The Hobbit, but eventually developed into a much larger work.',
}]

export default router;