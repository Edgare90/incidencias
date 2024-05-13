import { TestBed } from '@angular/core/testing';

import { LightboxServiceService } from './lightbox-service.service';

describe('LightboxServiceService', () => {
  let service: LightboxServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LightboxServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
