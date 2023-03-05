import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { Request, FoodCategory } from './request';
import { RequestService } from './request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss'],
  providers: []
})
export class RequestListComponent implements OnInit, OnDestroy{

  public serverFilteredRequests: Request[];
  public filteredRequests: Request[];

  public requestName: string;
  public requestCategory: FoodCategory;
  public requestUnit: string;
  public requestCount: number;
  public requestPrice: number;
  public requestPriority: number;

  private ngUnsubscribe = new Subject<void>();

  constructor(private requestService: RequestService, private snackBar: MatSnackBar) {
    // Nothing here – everything is in the injection parameters.
  }
  getRequestsFromServer(): void {

    this.requestService.getRequests().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({

      next: (returnedRequests) => {

        this.serverFilteredRequests = returnedRequests;

      },

      error: (err) => {
        let message = '';
        if (err.error instanceof ErrorEvent) {
          message = `Problem in the client – Error: ${err.error.message}`;
        } else {
          message = `Problem contacting the server – Error Code: ${err.status}\nMessage: ${err.message}`;
        }
        this.snackBar.open(
          message,
          'OK',

          { duration: 6000 });
      },

    });
  }

  ngOnInit(): void {
    this.getRequestsFromServer();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
