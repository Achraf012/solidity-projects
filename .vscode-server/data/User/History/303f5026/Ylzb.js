class Person{
    constructor(name,age){
        this.name=name;
        this._age=age;
    }
    greet(){
        console.log(`hello my name is ${this.name}, Iam ${this.age} years old`)
    }
    get age(){
        return this._age;
    }
    set age(newAge){
        if (newAge>18) {
            console.log(`mutherFucker you are old`);
            this._age=newAge;
            
        }else{
            console.log(`bitch you are a fucking baby`);
        }
    }
}
let person = new Person("Achraf",25);
person.greet();
console.log(person.age);
person.age= 29;
console.log(person.age);
person.age= 10;
console.log(person.age);