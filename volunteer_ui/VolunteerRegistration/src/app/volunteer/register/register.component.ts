import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ CommonModule, ReactiveFormsModule, MatCardModule,MatFormFieldModule,
    MatInputModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
programs: any[] = [];
  selectedPrograms: number[] = [];
  availability: any[] = [];

  form;

  days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  times = ['Morning','Evening'];

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      phone: [''],
      city: [''],
      state: ['']
    });

    this.auth.getProgramsPublic().subscribe(res => this.programs = res);
  }

  toggleProgram(id: number) {

  if (this.selectedPrograms.includes(id)) {
    // If already selected → remove it
    const index = this.selectedPrograms.indexOf(id);
    this.selectedPrograms.splice(index, 1);
  } else {
    // If not selected → add it
    this.selectedPrograms.push(id);
  }

}

  toggleAvailability(day: string, time: string) {
    this.availability.push({ day, time });
  }

  submit() {
    const payload = {
      ...this.form.value,
      programs: this.selectedPrograms,
      availability: this.availability
    };

    this.auth.registerVolunteer(payload)
      .subscribe(() => alert('Volunteer Registered'));
  }

}
