import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-forgot-password',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {

  step = 1;

  emailForm!: FormGroup;
  resetForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    // ✅ Initialize forms AFTER fb is available
    this.emailForm = this.fb.group({
      email: ['', Validators.required]
    });

    this.resetForm = this.fb.group({
      otp: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  sendOtp() {
    this.auth.forgotPassword(this.emailForm.value.email)
      .subscribe(() => this.step = 2);
  }

  reset() {
    this.auth.resetPassword(this.resetForm.value)
      .subscribe(() => alert('Password reset successful'));
  }
}
