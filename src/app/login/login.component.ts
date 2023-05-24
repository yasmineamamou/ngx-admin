import { Component, OnInit } from '@angular/core';
import { NbAuthService, NbLoginComponent } from '@nebular/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "./../services/auth.service";
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class NgxLoginComponent implements OnInit {
  public loginForm: FormGroup;
  submitted = false;
  
  constructor(private service: AuthService, private router: Router,private authService: AuthService, private formBuilder: FormBuilder, private toastrService: NbToastrService){this.createLoginForm();}

  ngOnInit(): void { }

  login(){
    if(!this.getValidate()){
      this.toastrService.warning("Erreur!! Vérifier votre email ou mot de passe", "Champs obligatoires");
    }else{
      this.service.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe(
        data => {
          /*this.tokenStorage.saveToken(data.data.token);
          this.tokenStorage.saveRefreshToken(data.data.token);
          this.tokenStorage.saveUser(data.data.user);*/
          this.toastrService.success("You're logged in", "Log-in");
          this.router.navigate(['/pages' ])
         // const user = JSON.parse(sessionStorage.getItem('user'));

        },
        err => { 
          this.toastrService.danger("Erreur!! can't login", "Erreur");
        }
      )};
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