import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentUsername: any
  currentAccno: any

  database: any = {
    1000: { acno: 1000, uname: "Neil", password: 1000, balance: 5000, transactions: [] },
    1001: { acno: 1001, uname: "jo", password: 1001, balance: 10000, transactions: [] },
    1002: { acno: 1002, uname: "neerav", password: 1002, balance: 15000, transactions: [] }
  }

  constructor() {
    this.getDetails()
   }

  //save data in local storage
  saveDetails(){
    localStorage.setItem("database",JSON.stringify(this.database))
    if (this.currentAccno) {
      localStorage.setItem("currentAccno",JSON.stringify(this.currentAccno))
    }
    if (this.currentUsername) {
      localStorage.setItem("currentUsername",JSON.stringify(this.currentUsername))
    }
  }

  //get data local storage

  getDetails(){
    if (localStorage.getItem("database")) {
      this.database = JSON.parse(localStorage.getItem("database")||'')
    }
    if (localStorage.getItem("currentAccno")) {
      this.currentAccno = JSON.parse(localStorage.getItem("currentAccno")||'')
    }
    if (localStorage.getItem("currentUsername")) {
      this.currentUsername = JSON.parse(localStorage.getItem("currentUsername")||'')
    }
  }

  //register
  register(accno: any, uname: any, password: any) {

    let database = this.database

    if (accno in database) {
      //accno already exist
      return false
    }
    else {
      database[accno] = {
        accno,
        uname,
        password,
        balance: 0,
        transactions: []
      }
      this.saveDetails()
      console.log(database);

      return true

    }
  }

  //login

  login(accno: any, pswd: any) {

    let database = this.database

    if (accno in database) {
      //account exist
      if (pswd == database[accno]["password"]) {
        this.currentUsername = database[accno]["uname"]
        this.currentAccno = accno
        this.saveDetails()
        //password matches
        return true
      } else {
        alert("incorrect password")
        return false
      }
    }
    else {
      alert("account does not exist")
      return false
    }
  }

  //deposit
  deposit(accno: any, pswd: any, amt: any) {
    var amount = parseInt(amt)
    let database = this.database

    if (accno in database) {
      if (pswd == database[accno]["password"]) {
        database[accno]["balance"] += amount
        database[accno]["transactions"].push({
          type: "CREDIT",
          amount: amount
        })
        console.log(database)
        this.saveDetails()
        return database[accno]["balance"]
      } else {
        alert("Incorect password")
        return false
      }
    } else {
      alert("Account does not exist..!")
      return false
    }
  }

  //withdraw
  withdraw(accno: any, pswd: any, amt: any) {
    var amount = parseInt(amt)
    let database = this.database

    if (accno in database) {
      if (pswd == database[accno]["password"]) {
        if (database[accno]["balance"] > amount) {
          database[accno]["balance"] -= amount
          database[accno]["transactions"].push({
            type: "DEBIT",
            amount: amount
          })
          console.log(database);
          this.saveDetails()
          return database[accno]["balance"]
        } else {
          alert("Insufficient balance")
          return false
        }
      } else {
        alert("Incorect password")
        return false
      }
    } else {
      alert("Account does not exist..!")
      return false
    }
  }

  getTransactions(accno: any) {
    return this.database[accno]["transactions"]
  }
}
