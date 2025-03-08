class bank{
    constructor(user,amount){
        this.user=user;
        this._amount=amount;
    }
    get amount(){
        return this._amount;
    }
    set amount(withdraw){
        if(withdraw>this.amount){console.log(`you are a fucking homeless you only have $${this.amount}`)}
        else{ this._amount-withdraw;
            console.log(`"you have money .. but only $${this.amount}"`)
        }
    }
}
let user1=new bank("achraf",200);
console.log(user1.amount);
user1.amount=300;
console.log(user1.amount);
user1.withdraw=200;
console.log(user1.amount);
