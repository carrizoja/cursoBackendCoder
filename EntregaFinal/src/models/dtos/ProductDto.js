class ProductDto {
    constructor(data) {
        this.name = data.name;
        this.id = data.id || null;
        this.price = data.price;
        this.timestamp = data.timestamp || null;
        this.thumbnail = data.thumbnail;
    }
}

module.exports = ProductDto;