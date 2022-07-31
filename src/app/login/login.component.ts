import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  aim = "Your are a valid user!!"
  accnum = "Account number please.."
  

  loginForm = this.fb.group({
    accno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor(private router: Router, private ds: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }


  login() {
    var accno = this.loginForm.value.accno
    console.log(accno);
    var pswd = this.loginForm.value.pswd
    console.log(pswd);

    if (this.loginForm.valid) {
      const result = this.ds.login(accno, pswd)
      if (result) {
        alert("Login successfull")
        this.router.navigateByUrl("home")
      }
    } else {
      alert("Invalid Form")
    }
  }

  // template referencing 

  // login(a:any,p:any){
  //   console.log(a);
  //   var accno = a.value
  //   console.log(accno);
  //   var pswd = p.value
  //   console.log(pswd);

  //   let database = this.database

  //   if(accno in database){
  //     //account exist
  //     if (pswd == database[accno]["password"]) {
  //       //password matches
  //       alert("login success")
  //     } else {
  //       alert("incorrect password")
  //     }
  //   }
  //   else{
  //     alert("account does not exist")
  //   }
  // }

}
