import { TestBed } from '@angular/core/testing';

import { DetallefacturaService } from './detallefactura.service';

describe('DetallefacturaService', () => {
  let service: DetallefacturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetallefacturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
