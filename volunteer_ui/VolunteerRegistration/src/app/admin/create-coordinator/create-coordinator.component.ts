import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-coordinator',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './create-coordinator.component.html'
})
export class CreateCoordinatorComponent {

  coordinatorForm;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.coordinatorForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      city: [''],
      state: ['']
    });
  }

  submit() {
    if (this.coordinatorForm.invalid) return;

    this.auth.createCoordinator(this.coordinatorForm.value)
      .subscribe(() => {
        alert('Coordinator created successfully');
        this.coordinatorForm.reset();
      });
  }
}
