class BankAccount {
  constructor(balance = 1000) {
    this._balance = balance
  }
  
  set balance(amount)
  {
    if (this.verifyAmountCanBeSetted(amount))
    {
      this._balance = amount;
    }
  }
  
  get balance()
  {
    return this._balance;
  }
  
  verifyAmountCanBeSetted(amount)
  {
    return true
  }
}


const bankAccount = new BankAccount();
let shoesPrice = 100;

//buy shit
bankAccount.balance -= shoesPrice;

console.log(bankAccount.balance);