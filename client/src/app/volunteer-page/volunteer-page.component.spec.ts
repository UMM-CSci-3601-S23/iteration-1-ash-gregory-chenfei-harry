import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockClientService } from 'src/testing/client.service.mock';
import { ClientService } from '../client/client.service';

import { VolunteerPageComponent } from './volunteer-page.component';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClientRequest } from '../client/client';

const COMMON_IMPORTS: unknown[] = [
  FormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatButtonModule,
  MatInputModule,
  MatExpansionModule,
  MatTooltipModule,
  MatListModule,
  MatDividerModule,
  MatRadioModule,
  MatIconModule,
  MatSnackBarModule,
  BrowserAnimationsModule,
  RouterTestingModule,
];

describe('VolunteerPageComponent', () => {
  let component: VolunteerPageComponent;
  let fixture: ComponentFixture<VolunteerPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [],
      // providers:    [ UserService ]  // NO! Don't provide the real service!
      // Provide a test-double instead
      providers: [{ provide: ClientService, useValue: new MockClientService() }]
    });
  });

  // This constructs the `userList` (declared
  // above) that will be used throughout the tests.
  beforeEach(waitForAsync(() => {
  // Compile all the components in the test bed
  // so that everything's ready to go.
    TestBed.compileComponents().then(() => {
      /* Create a fixture of the UserListComponent. That
       * allows us to get an instance of the component
       * (userList, below) that we can control in
       * the tests.
       */
      fixture = TestBed.createComponent(VolunteerPageComponent);
      component = fixture.componentInstance;
      /* Tells Angular to sync the data bindings between
       * the model and the DOM. This ensures, e.g., that the
       * `userList` component actually requests the list
       * of users from the `MockUserService` so that it's
       * up to date before we start running tests on it.
       */
      fixture.detectChanges();
    });
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('Misbehaving User List', () => {
  let userList: VolunteerPageComponent;
  let fixture: ComponentFixture<VolunteerPageComponent>;

  let serviceStub: {
    getRequests: () => Observable<ClientRequest[]>;
  };

  beforeEach(() => {
    serviceStub = {
      getRequests: () => new Observable(observer => {
        observer.error('getUsers() Observer generates an error');
      })
    };

    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [VolunteerPageComponent],
      // providers:    [ UserService ]  // NO! Don't provide the real service!
      // Provide a test-double instead
      providers: [{ provide: ClientService, useValue: serviceStub }]
    });
  });

  // Construct the `userList` used for the testing in the `it` statement
  // below.
  beforeEach(waitForAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(VolunteerPageComponent);
      userList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('generates an error if we don\'t set up a UserListService', () => {
    // Since calling either getUsers() or getUsersFiltered() return
    // Observables that then throw exceptions, we don't expect the component
    // to be able to get a list of users, and serverFilteredUsers should
    // be undefined.
    expect(userList.requests).toBeUndefined();
  });
});
