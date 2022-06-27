class MemoryDao {
    constructor() {
        this.elements = [];
    }
    listAll() {
        return [...this.elements];
    }
    getById(id) {
        const user = this.elements.find(user => user.id === id);
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;

    }

    create(userData) {
        let newId;
        if (this.elements.length > 0) {
            newId = this.elements[this.elements.length - 1].id + 1;
        } else {
            newId = 1;
        }

        const user = {...userData, id: newId };
        this.elements.push(user);
    }

}

module.exports = MemoryDao;