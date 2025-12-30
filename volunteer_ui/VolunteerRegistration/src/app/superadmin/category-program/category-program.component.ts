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
  selector: 'app-category-program',
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule,MatButtonModule,MatSelectModule],
  templateUrl: './category-program.component.html',
  styleUrl: './category-program.component.css'
})
export class CategoryProgramComponent {
  categories: any[] = [];
  programs: any[] = [];

  categoryForm;
  programForm;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.categoryForm = this.fb.group({ name: [''] });
    this.programForm = this.fb.group({
      category_id: [''],
      name: [''],
      description: ['']
    });

    this.loadData();
  }

  loadData() {
    this.auth.getCategories().subscribe(res => this.categories = res);
    this.auth.getPrograms().subscribe(res => this.programs = res);
  }

  addCategory() {
    this.auth.addCategory(this.categoryForm.value.name)
      .subscribe(() => this.loadData());
  }

  addProgram() {
    this.auth.addProgram(this.programForm.value)
      .subscribe(() => this.loadData());
  }

}
