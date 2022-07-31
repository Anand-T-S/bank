import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  accno = ""
  pswd = ""
  amount = ""

  waccno = ""
  wpswd = ""
  wamount = ""

  //depositForm
  depositForm = this.fb.group({
    accno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })

  //widthdrawForm
  withdrawForm = this.fb.group({
    waccno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    wpswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    wamount: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })

  User:any
  loginDate:any

  constructor(private ds: DataService, private fb: FormBuilder,private router: Router) { 
    this.User = this.ds.currentUsername
    this.loginDate = new Date
  }

  ngOnInit(): void {
    if (!localStorage.getItem("currentAccno")) {
      alert("please LogIn....")
      this.router.navigateByUrl("")
    }
  }

  deposit() {
    var accno = this.depositForm.value.accno
    var pswd = this.depositForm.value.pswd
    var amount = this.depositForm.value.amount

    if (this.depositForm.valid) {
      //call deposit in database
      const result = this.ds.deposit(accno, pswd, amount)
      if (result) {
        alert(amount + " deposit successfully and new balance is: " + result)
      }
    } else {
      alert("Invalid Form")
    }

  }

  withdraw() {
    var accno = this.withdrawForm.value.waccno
    var pswd = this.withdrawForm.value.wpswd
    var amount = this.withdrawForm.value.wamount

    if (this.withdrawForm.valid) {
      //call withdraw in database
      const result = this.ds.withdraw(accno, pswd, amount)
      if (result) {
        alert(amount + " debited successfully and new balance is: " + result)
      }
    } else {
      alert("Invalid Form")
    }
  }

  //logout
  logout(){
    localStorage.removeItem("currentUsername")
    localStorage.removeItem("currentAccno")
    this.router.navigateByUrl("")
  }

}
