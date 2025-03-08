class Person{
    constructor(name,age){
        this.name=name;
        this.age=age;
    }
    greet(){
        console.log(`hello my name is ${this.name}, Iam ${this.age} years old`)
    }
    get age(){
        return this.age;
    }
    set age(newAge){
        if (newAge>18) {
            
        }
    }
}
let person = new Person("Achraf",25);
person.greet();
console.log(person.age);