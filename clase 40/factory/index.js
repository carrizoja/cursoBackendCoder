class Employee {
    speak() {
        return "I am an employee " + this.type;
    }
}


class FullTimeEmployee extends Employee {
    constructor() {
        super();
        this.type = 'FullTimeEmployee';
    }
}

class PartTimeEmployee extends Employee {
    constructor() {
        super();
        this.type = 'PartTimeEmployee';
    }
}

class FullContratorTimeEmployee extends Employee {
    constructor() {
        super();
        this.type = 'FullContratorTimeEmployee';
    }
}

class MyEmployeesFactory {
    createEmployee(data) {
        if (data.type === 'FullTimeEmployee') {
            return new FullTimeEmployee();
        }
        if (data.type === 'PartTimeEmployee') {
            return new PartTimeEmployee();
        }
        if (data.type === 'FullContratorTimeEmployee') {
            return new FullContratorTimeEmployee();
        }
    }
}

let company = new MyEmployeesFactory();
let type = ['FullTimeEmployee', 'PartTimeEmployee', 'FullContratorTimeEmployee'];
let employees = [];
for (let i = 0; i <= 10; i++) {
    employees.push(company.createEmployee({ type: type[Math.floor(Math.random(3) * 3)] }));
}

console.log(employees);

employees.forEach(employee => {
    console.log(employee.speak());
});