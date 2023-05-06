import { Component, OnInit } from '@angular/core';
import { NbAuthService, NbLoginComponent } from '@nebular/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "./../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})

export class NgxLoginComponent implements OnInit {
  public loginForm: FormGroup;
  submitted = false;
  constructor(private service: AuthService, private router: Router, private formBuilder: FormBuilder){
    this.createLoginForm();
  }
  ngOnInit(): void {
  }
  login(){
    if(!this.getValidate()){
      console.log("Erreur! can't login!!")
  
    }else{
      this.service.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe(
        data => {
          /*this.tokenStorage.saveToken(data.data.token);
          this.tokenStorage.saveRefreshToken(data.data.token);
          this.tokenStorage.saveUser(data.data.user);*/
          this.router.navigate(['/pages' ])
        },
        err => {
          console.log("Erreur!! can't login") 
        }
      );
    }
  }

  getValidate(){
    return  this.loginForm.controls.email.status=='VALID' &&this.loginForm.controls.password.status=='VALID' ? true :false
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required],
    })
  }
}