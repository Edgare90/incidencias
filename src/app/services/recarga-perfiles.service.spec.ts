import { TestBed } from '@angular/core/testing';

import { RecargaPerfilesService } from './recarga-perfiles.service';

describe('RecargaPerfilesService', () => {
  let service: RecargaPerfilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecargaPerfilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
