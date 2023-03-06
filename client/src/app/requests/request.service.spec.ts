import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { Request } from './request';

import { RequestService } from './request.service';

describe('RequestService', () => {
  /* eslint @typescript-eslint/naming-convention: 'off' */
  const testRequests: Request[] = [
    {
      _id: '588935f5556f992bf8f37c01',
      name: 'Apples',
      category: 'fruits',
      unit: 'request',
      count: 32,
      price: 10.23,
      priority: 2,
      date_added: '2023-02-28T19:17:04Z',
      date_updated: '2023-02-28T19:17:04Z',
      count_remaining: 2
    },
    {
      _id: '588935f5556f992bf8f37c02',
      name: 'Jon',
      category: 'household',
      unit: 'cups',
      count: 100,
      price: 9.12,
      priority: 8,
      date_added: '2023-01-11T19:17:04Z',
      date_updated: '2023-01-11T19:17:04Z',
      count_remaining: 20}
  ];

  let requestService: RequestService;

  // These are used to mock the HTTP requests so that we (a) don't have to
  // have the server running and (b) we can check exactly which HTTP
  // requests were made to ensure that we're making the correct requests.
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
    requestService = new RequestService(httpClient);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  describe('When getRequests() is called with no parameters', () => {
    it('calls `api/requests`', waitForAsync(() => {
      // Mock the `httpClient.get()` method, so that instead of making an HTTP request,
      // it just returns our test data.
      const mockedMethod = spyOn(httpClient, 'get').and.returnValue(of(testRequests));

      requestService.getRequests().subscribe(() => {
        expect(mockedMethod)
          .withContext('one call')
          .toHaveBeenCalledTimes(1);
        expect(mockedMethod)
          .withContext('talks to the correct endpoint')
          .toHaveBeenCalledWith(requestService.requestUrl, { params: new HttpParams() });
      });
    }));
  });
/////////////////////////// We don't need this right now since we aren't currently filtering by parameters.
  // describe('When getRequests() is called with parameters', () => {
  //   it('calls `api/requests with the right arguments for category`', waitForAsync(() => {
  //     // Mock the `httpClient.get()` method, so that instead of making an HTTP request,
  //     // it just returns our test data.
  //     const mockedMethod = spyOn(httpClient, 'get').and.returnValue(of(testRequests));

  //     requestService.getRequests({category: 'fruits'}).subscribe(() => {
  //       expect(mockedMethod)
  //         .withContext('one call')
  //         .toHaveBeenCalledTimes(1);
  //       expect(mockedMethod)
  //         .withContext('talks to the correct endpoint')
  //         .toHaveBeenCalledWith(requestService.requestUrl, { params: new HttpParams().set('category', 'fruits') });
  //     });
  //   }));

  //   it('calls `api/requests with the right arguments for count`', waitForAsync(() => {
  //     // Mock the `httpClient.get()` method, so that instead of making an HTTP request,
  //     // it just returns our test data.
  //     const mockedMethod = spyOn(httpClient, 'get').and.returnValue(of(testRequests));

  //     requestService.getRequests({count: 4}).subscribe(() => {
  //       expect(mockedMethod)
  //         .withContext('one call')
  //         .toHaveBeenCalledTimes(1);
  //       expect(mockedMethod)
  //         .withContext('talks to the correct endpoint')
  //         .toHaveBeenCalledWith(requestService.requestUrl, { params: new HttpParams().set('count', '4') });
  //     });
  //   }));

  //   it('calls `api/requests with the right arguments for unit`', waitForAsync(() => {
  //     // Mock the `httpClient.get()` method, so that instead of making an HTTP request,
  //     // it just returns our test data.
  //     const mockedMethod = spyOn(httpClient, 'get').and.returnValue(of(testRequests));

  //     requestService.getRequests({unit: 'boxes'}).subscribe(() => {
  //       expect(mockedMethod)
  //         .withContext('one call')
  //         .toHaveBeenCalledTimes(1);
  //       expect(mockedMethod)
  //         .withContext('talks to the correct endpoint')
  //         .toHaveBeenCalledWith(requestService.requestUrl, { params: new HttpParams().set('unit', 'boxes') });
  //     });
  //   }));
  //  });



  it('should be created', () => {
    expect(requestService).toBeTruthy();
  });
});
