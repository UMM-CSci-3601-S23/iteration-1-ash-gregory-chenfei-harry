import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Request } from './request';
import { RequestService } from './request.service';
import { Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-request-profile',
  templateUrl: './request-profile.component.html',
  styleUrls: ['./request-profile.component.scss']
})
export class RequestProfileComponent implements OnInit, OnDestroy {
 request: Request;

 private ngUnsubscribe = new Subject<void>();


 constructor(private snackBar: MatSnackBar, private route: ActivatedRoute, private requestService: RequestService) { }


 ngOnInit(): void {

  this.route.paramMap.pipe(

    map((paramMap: ParamMap) => paramMap.get('id')),

    switchMap((id: string) => this.requestService.getRequestById(id)),

    takeUntil(this.ngUnsubscribe)
  ).subscribe({
    next: request => {
      this.request = request;
      return request;
    },
    error: _err => {
      this.snackBar.open('Problem loading the request – try again', 'OK', {
        duration: 5000,
      });
    }

  });
}


 ngOnDestroy() {
  this.ngUnsubscribe.next();

  this.ngUnsubscribe.complete();
 }

}
