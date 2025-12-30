import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './create-admin.component.html'
})
export class CreateAdminComponent {

  adminForm;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.adminForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      city: [''],
      state: ['']
    });
  }

  submit() {
    if (this.adminForm.invalid) return;

    this.auth.createAdmin(this.adminForm.value)
      .subscribe(() => {
        alert('Admin created successfully');
        this.adminForm.reset();
      });
  }
}
