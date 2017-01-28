/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StockServiceService } from './stock-service.service';

describe('StockServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockServiceService]
    });
  });

  it('should ...', inject([StockServiceService], (service: StockServiceService) => {
    expect(service).toBeTruthy();
  }));
});
