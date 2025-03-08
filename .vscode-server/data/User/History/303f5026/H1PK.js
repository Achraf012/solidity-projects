class bank{
    constructor(user,amount){
        this.user=user;
        this._amount=amount;
    }
    get amount(){
        return this._amount;
    }
    set amount(newAmount){
        if(newAmount<100){console.log(`you are a fucking homeless`)}
        else{ this._amount=newAmount;
            console.log(`"you have money .. but only $${this.amount}"`)
        }
    }
}