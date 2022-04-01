import faker from 'faker';
const { datatype } = faker;
export default class ContenedorMemoria {
    constructor() {
        this.users = [];
    }
    listarAll = () => {
        return this.users;

    }
    listar = (id) => {
        let element = this.users.find(element => element.id === id);
        return element ? element : null;
    }
    guardar = (user) => {
        user.id = datatype.uuid();
        this.users.push(user);
        return user;
    }
    actualizar = (id, user) => {
        let index = this.users.findIndex(element => element.id === id);
        user.id = this.users[index].id;
        this.users[index] = user;
        return user;
    }
    borrar = (id) => {
        let index = this.users.findIndex(element => element.id === id);
        this.users.splice(index, 1);
        return true;
    }

}