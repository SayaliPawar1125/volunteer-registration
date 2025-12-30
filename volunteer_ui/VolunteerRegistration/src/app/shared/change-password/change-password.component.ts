import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-change-password',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent {

  form;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = this.fb.group({
      current_password: [''],
      new_password: [''],
      confirm_password: ['']
    });
  }

  submit() {
    if (this.form.value.new_password !== this.form.value.confirm_password) {
      alert('Passwords do not match');
      return;
    }

    this.auth.changePassword(this.form.value)
      .subscribe(() => alert('Password updated'));
  }
}
