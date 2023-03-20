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
      providers: [{ provide: ClientService, useValue: new MockClientService() }]
    });
  });

  beforeEach(waitForAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(VolunteerPageComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
    });
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('Misbehaving Client Request List', () => {
  let component: VolunteerPageComponent;
  let fixture: ComponentFixture<VolunteerPageComponent>;

  let serviceStub: {
    getRequests: () => Observable<ClientRequest[]>;
  };

  beforeEach(() => {
    serviceStub = {
      getRequests: () => new Observable(observer => {
        observer.error('getRequests() Observer generates an error');
      })
    };

    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [VolunteerPageComponent],
      providers: [{ provide: ClientService, useValue: serviceStub }]
    });
  });

  beforeEach(waitForAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(VolunteerPageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('generates an error if we don\'t set up a ClientService', () => {

    expect(component.requests).toBeUndefined();
  });
});
