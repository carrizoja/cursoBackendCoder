const Todos = require("./claseTodo");
const assert = require("assert");

describe('test para ToDo', () => {
    it('debe retornar un array', () => {
        const todos = new Todos();
        assert.strictEqual(todos.list().length, 0);

    });
    it("Debería agregar una tarea correctamente", () => {
        const todo = new Todos();
        todo.add("One task");
        todo.add("Two task");
        assert.strictEqual(todo.list().length, 1);
        assert.deepStrictEqual(todo.list(), [{
            title: 'One task',
            complete: false,
        }])
    })
})