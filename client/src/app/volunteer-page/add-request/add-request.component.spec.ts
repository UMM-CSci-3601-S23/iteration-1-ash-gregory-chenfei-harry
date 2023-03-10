import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, AbstractControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AddRequestComponent } from './add-request.component';
import { RequestService } from 'src/app/requests/request.service';
import { MockRequestService } from 'src/testing/request.service.mock';

describe('AddRequestComponent', () => {
  let component: AddRequestComponent;
  let addRequestForm: FormGroup;
  let fixture: ComponentFixture<AddRequestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.overrideProvider(RequestService, { useValue: new MockRequestService() });
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      declarations: [AddRequestComponent],
    }).compileComponents().catch(error => {
      expect(error).toBeNull();
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    addRequestForm = component.addRequestForm;
    expect(addRequestForm).toBeDefined();
    expect(addRequestForm.controls).toBeDefined();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('The price field', () => {
    let priceControl: AbstractControl;

    beforeEach(() => {
      priceControl = component.addRequestForm.controls.price;
    });

    it('should not allow negative values', () => {
      priceControl.setValue(-1.0);
      expect(priceControl.valid).toBeFalsy();
      expect(component.getErrorMessage('category')).toBeTruthy();
    });
  });

  describe('The priority field', () => {
    let priorityControl: AbstractControl;

    beforeEach(() => {
      priorityControl = component.addRequestForm.controls.priority;
    });

    it('should not allow negative values', () => {
      priorityControl.setValue(-1.0);
      expect(priorityControl.valid).toBeFalsy();
      expect(component.getErrorMessage('priority')).toBeTruthy();
    });
  });

  describe('Proper bad error message', () => {
    let priorityControl: AbstractControl;

    beforeEach(() => {
      priorityControl = component.addRequestForm.controls.priority;
    });

    it('should allow positive values', () => {
      priorityControl.setValue(1.0);
      expect(priorityControl.valid).toBeTruthy();
      expect(component.getErrorMessage('priority')).toBe('Unknown error');
    });
  });
});
