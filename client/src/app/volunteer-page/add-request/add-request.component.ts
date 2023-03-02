import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss']
})
export class AddRequestComponent {
  addRequestForm = new FormGroup({
    // Add requirements for the name field
    name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(1)])),
    // Add requirements for the category field
    category: new FormControl('', Validators.compose([Validators.required, Validators.minLength(1)])),
    // Add requirements for the unit field
    unit: new FormControl('', Validators.compose([Validators.required, Validators.minLength(1)])),
    // Add requirements for the count field
    count: new FormControl('', Validators.compose([Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')])),
    // Add requirements for the price field
    price: new FormControl('', Validators.compose([Validators.required, Validators.min(0)])),
    // Add requirements for the priority field
    priority: new FormControl('', Validators.compose([Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')])),
  });

  // We can only display one error at a time,
  // the order the messages are defined in is the order they will display in.
  readonly addRequestValidationMessages = {
    name: [
      {type: 'required', message: 'Name is required'},
      {type: 'minlength', message: 'Name must be nonempty'},
    ],

    category: [
      {type: 'required', message: 'Category is required'},
      {type: 'minlength', message: 'Category must be nonempty'},
    ],

    unit: [
      {type: 'required', message: 'Category is required'},
      {type: 'minlength', message: 'Category must be nonempty'},
    ],

    count: [
      {type: 'required', message: 'Count is required'},
      {type: 'min', message: 'Count must be positive'},
      {type: 'pattern', message: 'Count must be a positive integer'},
    ],

    priority: [
      {type: 'required', message: 'Priority is required'},
      {type: 'min', message: 'Priority must be positive'},
      {type: 'pattern', message: 'Priority must be a positive integer'},
    ],

    price: [
      {type: 'required', message: 'Price is required'},
      {type: 'min', message: 'Price must be positive or zero'},
    ],
  };

  // Constructor which injects the components we need
  constructor(private snackBar: MatSnackBar, private router: Router) {
  }

  formControlHasError(controlName: string): boolean {
    return this.addRequestForm.get(controlName).invalid &&
      (this.addRequestForm.get(controlName).dirty || this.addRequestForm.get(controlName).touched);
  }

  getErrorMessage(name: keyof typeof this.addRequestValidationMessages): string {
    for(const {type, message} of this.addRequestValidationMessages[name]) {
      if (this.addRequestForm.get(name).hasError(type)) {
        return message;
      }
    }
    return 'Unknown error';
  }

  submitForm() {
    /*
    this.requestService.addRequest(this.addRequestForm.value).subscribe({
      next: (newId) => {
        this.snackBar.open(
          `Added request ${this.addRequestForm.value.name}`,
          null,
          { duration: 2000 }
        );
        this.router.navigate(['/requests/', newId]);
      },
      error: err => {
        this.snackBar.open(
          `Problem contacting the server - Error Code: ${err.status}\nMessage: ${err.message}`,
          'OK',
          { duration: 5000 }
        );
      },
      // complete: () => console.log('Add user completes!')
    });*/
  }
}

