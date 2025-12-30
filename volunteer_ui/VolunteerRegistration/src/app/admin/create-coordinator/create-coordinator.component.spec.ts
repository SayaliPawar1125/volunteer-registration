import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCoordinatorComponent } from './create-coordinator.component';

describe('CreateCoordinatorComponent', () => {
  let component: CreateCoordinatorComponent;
  let fixture: ComponentFixture<CreateCoordinatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCoordinatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
