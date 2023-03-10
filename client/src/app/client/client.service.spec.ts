import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { of } from 'rxjs';
import { ClientRequest } from './client';

import { ClientService } from './client.service';

describe('ClientService', () => {
  const testRequests: ClientRequest[] = [
    {
      _id: '588935f5556f992bf8f37c01',
      needMet: true,
      needDescription: 'The food shelf does meet my needs. But I wish they had more salsa',
      dateAdded: '2023-01-12T19:17:42Z'
    }];

  let service: ClientService;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    // Set up the mock handling of the HTTP requests
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    // Construct an instance of the service with the mock
    // HTTP client.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = new ClientService(httpClient);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  describe('Adding a user using `addUser()`', () => {
    it('talks to the right endpoint and is called once', waitForAsync(() => {
      // Mock the `httpClient.addUser()` method, so that instead of making an HTTP request,
      // it just returns our test data.
      const USER_ID = 'pat_id';
      const mockedMethod = spyOn(httpClient, 'post').and.returnValue(of(USER_ID));

      // paying attention to what is returned (undefined) didn't work well here,
      // but I'm putting something in here to remind us to look into that
      service.addRequest(testRequests[1]).subscribe((returnedString) => {
        console.log('The thing returned was:' + returnedString);
        expect(mockedMethod)
          .withContext('one call')
          .toHaveBeenCalledTimes(1);
        expect(mockedMethod)
          .withContext('talks to the correct endpoint')
          .toHaveBeenCalledWith(service.requestUrl, testRequests[1]);
      });
    }));
  });

  describe('When getRequests() is called with no parameters', () => {
    it('calls `api/requests`', waitForAsync(() => {
      // Mock the `httpClient.get()` method, so that instead of making an HTTP request,
      // it just returns our test data.
      const mockedMethod = spyOn(httpClient, 'get').and.returnValue(of(testRequests));

      service.getRequests().subscribe(() => {
        expect(mockedMethod)
          .withContext('one call')
          .toHaveBeenCalledTimes(1);
        expect(mockedMethod)
          .withContext('talks to the correct endpoint')
          .toHaveBeenCalledWith(service.requestUrl);
      });
    }));
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
