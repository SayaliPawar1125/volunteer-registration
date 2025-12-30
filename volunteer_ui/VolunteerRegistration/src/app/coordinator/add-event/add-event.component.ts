import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-event',
  imports: [ CommonModule,ReactiveFormsModule,MatCardModule,MatFormFieldModule,
    MatInputModule,MatButtonModule,MatSelectModule],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent {
 programs: any[] = [];

  eventForm;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.eventForm = this.fb.group({
      program_id: [''],
      description: [''],
      start_date: [''],
      end_date: [''],
      address: [''],
      city: [''],
      state: [''],
      pincode: ['']
    });

    this.auth.getPrograms().subscribe(res => this.programs = res);
  }

  submit() {
    this.auth.addEvent(this.eventForm.value)
      .subscribe(() => alert('Event created'));
  }
}
