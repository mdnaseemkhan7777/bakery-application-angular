import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validator, Validators} from '@angular/forms'
import {FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})

export class ReactiveFormComponent implements OnInit {
  // public loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,private http: HttpClient, private router: Router) { }

  
  ngOnInit(): void {
    // this.loginForm = this.formBuilder.group({
    //   email:[''],
    //   password:['']
    // })
  }

  loginForm = new FormGroup({
    email:new FormControl('',[Validators.required, Validators.email]),
    password : new FormControl('',[Validators.required,Validators.minLength(5)])
  })

  loginUser(){
    this.http.get<any>("http://localhost:3000/loginUsersList")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password 
      });
      if(user){
        alert('Login Succesful');
        this.loginForm.reset()
      this.router.navigate(["customer"])
      }else{
        alert("user not found")
      }
    },err=>{
      alert("Something went wrong")
    })
  }

  get email (){
    return this.loginForm.get('email')
  }
  get password (){
    return this.loginForm.get('password')
  }

  


}
