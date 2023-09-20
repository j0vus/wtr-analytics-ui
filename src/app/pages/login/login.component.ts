import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConsts } from 'app/core/constants/appConstants';
import { AppComponentBase } from 'app/core/shared/AppComponentBase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends AppComponentBase implements OnInit {

  logInForm!: FormGroup;
  submited: Boolean = false;
  submitedInValid: Boolean = false;
  // @BlockUI() blockUI!: NgBlockUI;
  returnUrl: any;
  constructor(injector: Injector, private router: Router, private route: ActivatedRoute) {


    super(injector);
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl']
    })
  }
  ngOnInit(): void {
    this.logInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      rememberMe: new FormControl(null)
    })

  }

  get f() {
    return this.logInForm.controls;
  }

  onSubmit() {


    if (this.logInForm.valid) {
      this.submitedInValid = false;
      let data: any = {
        "username": this.logInForm.value.email,
        "password": this.logInForm.value.password
      }
      // this.blockUI?.start();
      this.apiService.post(AppConsts.userlogin, JSON.stringify(data)).subscribe(res => {
        if (res?.status == 200 || res?.status == "success") {


          // if (this.logInForm.value.rememberMe) {
          //   localStorage.setItem('currentUserData', JSON.stringify(res));
          //   // this.blockUI?.stop()

          // } else {
          //   sessionStorage.setItem('currentUserData', JSON.stringify(res));
          //   // this.blockUI?.stop();

          // }
            
          localStorage.setItem('currentUserData', JSON.stringify(res));
          sessionStorage.setItem('currentUserData', JSON.stringify(res));


          if (this.returnUrl) {
            this.loginNavigate()
          } else {
            this.router.navigate(['/dashboard']);
          }
          this.authService.isLoggedInSubject.next(res);
        } else if (res?.status == 401) { //Unauthorized

          this.submitedInValid = false;
        } else if (res?.status == 403) { //Forbidden

        } else {
          console.log('Some thing went wrong. Please try again in some time!');
        }
        // this.blockUI?.stop()
      })
    } else {
      this.submited = false;

      this.submitedInValid = true;
    }
  }

  urlNavigate(route: string) {
    this.router.navigate([`${route}`]);
  }

  loginNavigate() {
    if (this.returnUrl.includes('docID')) {
      this.returnUrl = this.returnUrl.split(/[\s=]+/)[1];
      this.router.navigate(['doc'], { queryParams: { docID: this.returnUrl } })
    } else {
      this.router.navigate([this.returnUrl]);
    }
  }

}
