import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ClientRequest } from './client';
import { ClientService } from './client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  addClientRequestForm = new FormGroup({
    needMet: new FormControl<boolean>(null, Validators.compose([Validators.required, Validators.minLength(1)])),
    needDescription: new FormControl('', Validators.compose([Validators.required, Validators.minLength(1)])),
  });

  readonly addRequestValidationMessages = {
    needMet: [
      {type: 'required', message: 'needMet is required'},
      {type: 'minlength', message: 'needMet must be nonempty'},
    ],

    needDescription: [
      {type: 'required', message: 'needDescription is required'},
      {type: 'minlength', message: 'needDescription must be nonempty'},
    ],
  };

   // Constructor which injects the components we need
   constructor(private snackBar: MatSnackBar, private router: Router, private service: ClientService) {
  }

  formControlHasError(controlName: string): boolean {
    return this.addClientRequestForm.get(controlName).invalid &&
      (this.addClientRequestForm.get(controlName).dirty || this.addClientRequestForm.get(controlName).touched);
  }

  getErrorMessage(name: keyof typeof this.addRequestValidationMessages): string {
    for(const {type, message} of this.addRequestValidationMessages[name]) {
      if (this.addClientRequestForm.get(name).hasError(type)) {
        return message;
      }
    }
    return 'Unknown error';
  }

  submitForm() {
    this.service.addRequest(this.addClientRequestForm.value).subscribe({
      error: err => {
        this.snackBar.open(
          `Problem contacting the server - Error Code: ${err.status}\nMessage: ${err.message}`,
          'OK',
          { duration: 5000 }
        );
      },
      complete: () => {
        this.snackBar.open(
          `Request for ${this.addClientRequestForm.value.needDescription} successfully added`,
          'OK',
          { duration: 5000 }
        );
      }
    });
  }
}
