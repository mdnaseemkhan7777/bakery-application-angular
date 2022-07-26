import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  loginForm = new FormGroup({
    userName:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required, Validators.email]),
    password : new FormControl('',[Validators.required,Validators.minLength(5)])
  })

  loginUser(){
    console.warn(this.loginForm.value);
  }
  get userName (){
    return this.loginForm.get('userName')
  }
  get email (){
    return this.loginForm.get('email')
  }
  get password (){
    return this.loginForm.get('password')
  }



  constructor() { }

  ngOnInit(): void {
  }

}
