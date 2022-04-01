import ContenedorMemoria from '../contenedores/ContenedorMemoria.js';
import faker from "faker";
export default class UsersMock extends ContenedorMemoria {
    constructor() {
        super();

    }
    popular = (cant = 50) => {
        const nuevos = [];
        for (let i = 0; i < cant; i++) {
            nuevos.push({
                id: faker.datatype.uuid(),
                nombre: faker.name.firstName(),
                apellido: faker.name.lastName(),
                email: faker.internet.email()

            })
        }
        this.users = [...this.users, ...nuevos];
        return nuevos;
    }
}