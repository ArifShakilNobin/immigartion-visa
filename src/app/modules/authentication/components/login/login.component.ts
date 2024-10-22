import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthenticationStorageService } from '../../services/authentication-storage.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoginActive = false;
  signupForm!: FormGroup;
  loginForm!: FormGroup;
  passwordVisible = false;
  confirmPasswordVisible = false;

  Password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@#$!%?&^*;:,<>.`~-])[A-Za-z\d$@#$!%?&^*;:,<>.`~-]{8,}$/;

  constructor(
    private authenticationStorageService: AuthenticationStorageService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private notification: NzNotificationService
  ) {
    if (this.authenticationService.getIsUserAuthenticated()) {
      this.router.navigateByUrl('home/test');
    }
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.minLength(8), this.confirmValidator]],
      role: ['', Validators.required],

  });

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  toggleForm(isLogin: boolean) {
    this.isLoginActive = isLogin;
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onSignup() {
    if (this.signupForm.valid) {
      console.log('Signup Form Value', this.signupForm.value);

      const signupCredentials = {
        username: this.signupForm.controls['username'].value,
        password: this.signupForm.controls['password'].value,
        role: this.signupForm.controls['role'].value,

      };



      // Handle signup logic here
      this.authenticationStorageService.registration(signupCredentials).subscribe({
        next: (response) => {
          // console.log(response);
          if (response.success === true) {
            this.notification.success('Success', response.message);
            // this.router.navigate(['home/login']);
          }

          if (response.success === false) {
            this.notification.error('Error', response.message);
          }
        },
      })

    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      const credentials = {
        username: this.loginForm.controls['username'].value,
        password: this.loginForm.controls['password'].value,
      };
      this.authenticationStorageService.login(credentials).subscribe({
        next: (response) => {
          console.log(response);
          if (response.success === true) {
            // this.router.navigate(['home/dashboard']);
            this.notification.success('Success', response.message);
            this.router.navigate(['home/test']);
          }

          if (response.success === false) {
            this.notification.error('Error', response.message);
          }
        },
      });
    }
  }

  resetLoginForm() {
    this.loginForm.reset();
  }

  passwordMatchValidator(formGroup: FormGroup): void {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() =>
      this.signupForm.controls['confirmPassword'].updateValueAndValidity()
    );
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (
      control.value !== this.signupForm.controls['password'].value
    ) {
      return { confirm: true, error: true };
    }
    return {};
  };


}
