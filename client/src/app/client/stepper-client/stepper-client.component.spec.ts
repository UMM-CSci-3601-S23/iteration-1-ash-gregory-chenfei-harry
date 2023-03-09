import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperClientComponent } from './stepper-client.component';

describe('StepperClientComponent', () => {
  let component: StepperClientComponent;
  let fixture: ComponentFixture<StepperClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepperClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepperClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
