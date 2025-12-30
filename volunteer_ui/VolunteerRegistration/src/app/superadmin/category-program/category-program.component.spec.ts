import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryProgramComponent } from './category-program.component';

describe('CategoryProgramComponent', () => {
  let component: CategoryProgramComponent;
  let fixture: ComponentFixture<CategoryProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryProgramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
