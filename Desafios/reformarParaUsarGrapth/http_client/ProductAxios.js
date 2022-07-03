let axios = require('axios');

class ProductAxios {
    constructor() {
        this.url = 'http://localhost:8080/api/products';
    }

    async getAllProducts() {
        try {
            const response = await axios.get(this.url);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }

    }


    async getProductById(id) {
        return axios.get(`${this.url}/${id}`);
    }

    async postProduct(data) {
        try {
            const response = await axios.post(this.url, data);
            return response.data;
        } catch (error) {
            console.log(error);
        }

    }



    async putProduct(id, product) {
        try {
            const response = await axios.put(`${this.url}/${id}`, product);
            return response.data;
        } catch (error) {
            console.log(error);
        }

    }


    async deleteProduct(id) {
        try {
            const response = await axios.delete(`${this.url}/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }

    }

}

module.exports = new ProductAxios();