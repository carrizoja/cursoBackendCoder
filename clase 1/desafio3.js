class Book {
    constructor(name, author) {
        this.name = name;
        this.author = author;
    }
}

class User {
    constructor(name, lastname) {
        this.name = name;
        this.lastname = lastname;
        this.books = [];
        this.pets = [];
    }
    getFullName() {

        console.log(`Nombre completo: ${this.name} ${this.lastname}`)
    }
    addPet(petName) {
        this.pets.push(petName);
    }
    countPets() {
        console.log(`La cantidad de mascotas es: ${this.pets.length}`);
    }
    addBook(Book) {
        this.books.push(Book);
    }
    getBookNames() {
        console.log("Los libros son: ");
        this.books.forEach(b => console.log(b.name));

    }

}

let user1 = new User("Jose", "Carrizo")
user1.getFullName();
user1.addPet("Gino");
user1.addPet("Luly");
console.log(user1.pets);
user1.countPets();
let book1 = new Book("Espejos", "Eduardo Galeano");
let book2 = new Book("11 Minutos", "Paulo Coelho");
user1.addBook(book1);
user1.addBook(book2);
console.log(user1.books);
user1.getBookNames();