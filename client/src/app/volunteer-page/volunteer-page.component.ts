import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { ClientRequest } from '../client/client';
import { ClientService } from '../client/client.service';
import { RequestService } from '../requests/request.service';

@Component({
  selector: 'app-volunteer-page',
  templateUrl: './volunteer-page.component.html',
  styleUrls: ['./volunteer-page.component.scss']
})
export class VolunteerPageComponent implements OnInit, OnDestroy {
  public requests: ClientRequest[];
  private ngUnsubscribe = new Subject<void>();


  constructor(private requestService: ClientService, private snackBar: MatSnackBar) {
    // Nothing here – everything is in the injection parameters.
  }

  getRequests(): void {
    // A user-list-component is paying attention to userService.getUsers
    // (which is an Observable<User[]>)
    // (for more on Observable, see: https://reactivex.io/documentation/observable.html)
    // and we are specifically watching for role and age whenever the User[] gets updated
    this.requestService.getRequests().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      // Next time we see a change in the Observable<User[]>,
      // refer to that User[] as returnedUsers here and do the steps in the {}
      next: (requests) => {
        // First, update the array of serverFilteredUsers to be the User[] in the observable
        this.requests = requests;
      },
      // If we observe an error in that Observable, put that message in a snackbar so we can learn more
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
          // The message will disappear after 6 seconds.
          { duration: 6000 });
      },
      // Once the observable has completed successfully
      // complete: () => console.log('Users were filtered on the server')
    });
  }
    /**
     * Starts an asynchronous operation to update the users list
     *
     */
    ngOnInit(): void {
      this.getRequests();
    }

    /**
     * When this component is destroyed, we should unsubscribe to any
     * outstanding requests.
     */
    ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
    }
}
