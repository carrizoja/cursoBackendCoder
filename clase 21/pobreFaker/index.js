import faker from 'faker';
faker.locale = "es";

const { name, internet, random, datatype } = faker;

let objects = [];

for (let i = 0; i < 100; i++) {
    objects.push({
        name: name.firstName(),
        lastName: name.lastName(),
        email: internet.email(),
        id: datatype.uuid(),
        age: random.number({ min: 18, max: 60 })
    })
}

console.log(objects);