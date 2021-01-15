import { TestBed } from '@angular/core/testing';

import { CavaleteService } from './cavalete.service';

describe('CavaleteService', () => {
  let service: CavaleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CavaleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
