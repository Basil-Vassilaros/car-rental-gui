import { TestBed } from '@angular/core/testing';

import { CarManufacturerService } from './car-manufacturer.service';

describe('CarManufacturerService', () => {
  let service: CarManufacturerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarManufacturerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
