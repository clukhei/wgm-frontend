import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { loginSuccess } from '../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginInfo: loginSuccess
  loginForm: FormGroup
  constructor(private router:Router, private fb: FormBuilder, private authSvc: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required)
    })
  }

  login(){
    const email = this.loginForm.get('email').value
    const password = this.loginForm.get('password').value 
    this.authSvc.doLogin(email, password)
      .then(res=>{
        console.log(res)
        this.loginInfo = res
        localStorage.setItem('token', this.loginInfo.token)
        this.router.navigate(['/home'])
      })
  }

}
