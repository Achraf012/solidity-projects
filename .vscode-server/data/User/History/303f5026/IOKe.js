class Person{
    constructor(name,age){
        this.name=name;
        this.age=age;
    }
    greet(){
        console.log(`hello my name is ${this.name}, Iam ${this.age} years old`)
    }
}