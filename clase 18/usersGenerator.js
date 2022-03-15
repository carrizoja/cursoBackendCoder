let connection = new Mongo();
let database = connect("localhost:27017/basePrueba");
database.users.insertMany(
    [
        { nombre: "Mauricio", apellido: "Espinosa", edad: 25, salario: 2500, genero: "H" },
        { nombre: "Marisol", apellido: "Cadena", edad: 23, salario: 750, genero: "M" },
        { nombre: "Juan", apellido: "Brito", edad: 35, salario: 1500, genero: "H" },
        { nombre: "Victor", apellido: "Iturburu", edad: 30, salario: 2000, genero: "H" },
        { nombre: "Greorgina", apellido: "Espinosa", edad: 25, salario: 2500, genero: "M" },
        { nombre: "Lizbeth", apellido: "Mendez", edad: 20, salario: 500, genero: "M" },
        { nombre: "Andrea", apellido: "Andrade", edad: 30, salario: 900, genero: "M" },
        { nombre: "Bety", apellido: "Bolaños", edad: 34, salario: 1600, genero: "M" },
        { nombre: "Héctor", apellido: "Godinez", edad: 28, salario: 1250, genero: "H" },
        { nombre: "Lucy", apellido: "Bedyuk", edad: 19, salario: 1000, genero: "M" },
        { nombre: "Karla", apellido: "Montaño", edad: 42, salario: 1150, genero: "M" },
    ]
)