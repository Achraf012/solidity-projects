class bank{
    constructor(user,balance){
        this.user=user;
        this._balance=balance;
    }
    get balance(){return this._balance;}
    set balance(amount){
        if (amount <= 0){console.log(`hey ${this.user} you have to put somme money in here`)}else{
            this._balance+=amount;
            console.log(`hey ${this.user} now you have $${this._balance} in your bank account`)
        }
    }
    withdraw(amount){
        if(amount>this._balance){
            console.log(`you dont have enough money for this , you only have $${this._balance}`)

        }
        else{
            this._balance-=amount;
            console.log(`hey ${this.user} now you have $${this._balance} in your bank account`)
        }
    }
}
let user1=new bank("achraf",0);
user1.balance=200;
user1.withdraw(150);