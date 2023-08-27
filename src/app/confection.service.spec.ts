import { TestBed } from '@angular/core/testing';

import { ConfectionService } from './confection.service';

describe('ConfectionService', () => {
  let service: ConfectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
