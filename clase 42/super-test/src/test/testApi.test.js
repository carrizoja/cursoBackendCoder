const request = require("supertest")("http://localhost:8080");
const expect = require("chai").expect;

describe('API - GET - /api/users', () => {
    it('Debería devolver un status 200', async() => {
        let response = await request.get("/api/users");

        // usamos la función expect 
        expect(response.status).to.eql(200);
    })
})