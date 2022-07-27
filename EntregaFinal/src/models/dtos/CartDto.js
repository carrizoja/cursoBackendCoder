class CartDto {
    constructor(data) {
        this.username = data.username;
        this.products = data.products;
        this.id = data.id || null;
        this.total = data.total || 0;
        this.timestamp = data.timestamp || null;
        this.address = data.address || null;
    }
}

module.exports = CartDto;