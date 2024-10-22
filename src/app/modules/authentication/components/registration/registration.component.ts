import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthenticationStorageService } from '../../services/authentication-storage.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  registrationForm!: FormGroup;
  regex = /[a-zA-Z]*/;
  userNameRegex = /^[a-zA-Z\s][a-zA-Z0-9\s][-'\w\s]+$/; //update pattern for User Name
  Password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@#$!%?&^*;:,<>.`~-])[A-Za-z\d$@#$!%?&^*;:,<>.`~-]{8,}$/;

  // for Otp
  tempNumber = 0;
  isVisible = false;
  validateForm!: FormGroup;
  otpForm!: FormGroup;
  // mobile
  contactNumber!: string;
  // otp
  receivedOtp!: string;
  nzFooterVisible = false;
  emailAlredyExist = false;
  nameAlredyExist = false;
  display: any;

  passwordVisible = false;
  confirmPasswordVisible = false;

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private authenticationStorageService: AuthenticationStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, this.noWhitespaceValidator]],
      email: ['', [Validators.email, Validators.required]],
      password: ['',[Validators.required,Validators.minLength(8),Validators.pattern(this.Password),],],
      confirmPassword: ['', [Validators.minLength(8), this.confirmValidator]],
      // userTypeId: ['', [Validators.required]],
      evColabTypeId: ['', [Validators.required]],
    });


  }


  handleCancel() {
    throw new Error('Method not implemented.');
  }


  submitForm() {
    this.authenticationStorageService.registration(this.registrationForm.value).subscribe(
      (response: any) => {
        this.notification.success('Success', response.message);
        this.router.navigate(['/login']);
      },
      (err) => {
        this.notification.error('Error', err.error.message);
      }
    );
    this.router.navigate(['/login']);
  }

  validateConfirmPassword(): void {
    setTimeout(() =>
      this.registrationForm.controls['confirmPassword'].updateValueAndValidity()
    );
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (
      control.value !== this.registrationForm.controls['password'].value
    ) {
      return { confirm: true, error: true };
    }
    return {};
  };

  resetForm(): void {
    this.registrationForm.reset();
    for (const key of Object.keys(this.registrationForm.controls)) {
      this.registrationForm.controls[key].markAsPristine();
      this.registrationForm.controls[key].updateValueAndValidity();
    }
  }

}
