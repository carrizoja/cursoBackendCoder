import {Context, helpers} from '../devDependencias.ts';
import {User} from '../types/user.ts';
const arr = [];

const findUserAll = (ctx: Context) => {
    try {
        ctx.response.body = arr;
    }
    catch (error) {
        ctx.response.status = 404;
        ctx.response.body = {message: error.message};

    }
    
}

const findUser = (ctx: Context) => {
    try {
       const {id} = helpers.getQuery(ctx,{mergeParams: true}); // returns an object
       const user: User = arr.find(x => {
           return x.uuid === id; 
       })
    }
    catch (error) {
        ctx.response.status = 404;
        ctx.response.body = {message: error.message};
    }
}

const 