/* eslint-disable no-underscore-dangle */
import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-stepper-client',
  templateUrl: './stepper-client.component.html',
  styleUrls: ['./stepper-client.component.scss']
})
export class StepperClientComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder) {}
}
