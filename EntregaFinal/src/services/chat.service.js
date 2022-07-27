const { chatDao } = require('../models/daos');


class Chat {
    constructor() {
        this.storage = chatDao;
    }

    async getAll() {
        try {
            return await this.storage.getAll();
        } catch (error) {
            console.log(error);
        }
    }

    /*    async save(data) {
           try {

               return await this.storage.save(data);
           } catch (error) {
               console.log(error);
           }
       }


       async getById(id) {
           try {
               return await this.storage.getById(id);
           } catch (error) {
               console.log(error);
           }
       } */

}

module.exports = new Chat();