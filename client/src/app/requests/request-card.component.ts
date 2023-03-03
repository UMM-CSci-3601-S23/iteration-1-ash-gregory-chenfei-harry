import { Component, Input } from '@angular/core';
import { Request } from './request';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss']
})
export class RequestCardComponent {

  @Input() request: Request;
  @Input() simple?: boolean = false;
}
