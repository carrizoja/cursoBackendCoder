import { schema, normalize, denormalize } from 'normalizr';

const blog = {
    id: "1",
    title: "Titulo de publicacion",
    description: "Descripcion de publicacion",
    content: "Contenido de publicacion",
    author: {
        id: "1",
        name: "Juan",
    },
    comments: [{
            id: "1",
            author: "Alejandro",
            content: "¡Buen post!",
        },
        {
            id: "2",
            author: "Juan",
            content: "¡Buen post 2!",
        }
    ]
}

// Normalization process
const author = new schema.Entity('authors');
const comment = new schema.Entity('comments');
const blogSchema = new schema.Entity('blog', {
    author: author,
    comments: [comment]
})

const normalizedData = normalize(blog, blogSchema);
/* console.log(normalizedData); */

console.log(JSON.stringify(normalizedData, null, '\t'));

// Desnormalization process

const normalData = denormalize(normalizedData.result, blogSchema, normalizedData.entities);
/* console.log(normalData); */