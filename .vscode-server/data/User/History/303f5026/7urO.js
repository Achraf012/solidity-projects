class Bank {
    constructor(user, balance) {
        this.user = user;
        this._balance = balance;
    }

    get balance() {
        return this._balance;
    }

    set balance(amount) {
        if (amount <= 0) {
            console.log(`Hey ${this.user}, you need to deposit a positive amount!`);
        } else {
            this._balance += amount;
            console.log(`Hey ${this.user}, you deposited $${amount}. New balance: $${this._balance}.`);
        }
    }

    withdraw(amount) {
        if (amount > this._balance) {
            console.log(`Hey ${this.user}, insufficient funds! You only have $${this._balance}.`);
        } else {
            this._balance -= amount;
            console.log(`Hey ${this.user}, you withdrew $${amount}. New balance: $${this._balance}.`);
        }
    }

    transfer(amount, recipient) {
        if (amount > this._balance) {
            console.log(`Hey ${this.user}, you don't have enough money to transfer $${amount}. Your balance is $${this._balance}.`);
        } else {
            this._balance -= amount;
            recipient._balance += amount;
            console.log(`Hey ${this.user}, you transferred $${amount} to ${recipient.user}. Your new balance is $${this._balance}.`);
            console.log(`Hey ${recipient.user}, you received $${amount} from ${this.user}. Your new balance is $${recipient._balance}.`);
        }
    }
}

// Example Usage
let user1 = new Bank("Achraf", 500);
let user2 = new Bank("Omar", 300);

console.log("Before Transfer:");
console.log(`${user1.user} balance: $${user1.balance}`);
console.log(`${user2.user} balance: $${user2.balance}`);

user1.transfer(200, user2); // Achraf transfers $200 to Omar

console.log("\nAfter Transfer:");
console.log(`${user1.user} balance: $${user1.balance}`);
console.log(`${user2.user} balance: $${user2.balance}`);

user1.transfer(400, user2); // Should print "Insufficient funds"

