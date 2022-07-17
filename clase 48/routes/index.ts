import {Router} from '../devDependencias.ts';


export const router = new Router();
.get('api/users', findUserAll)
.get('api/users/:id', findUser)
.post('api/users', createUser)