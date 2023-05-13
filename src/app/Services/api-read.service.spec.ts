import { TestBed } from '@angular/core/testing';

import { ApiReadService } from './Services/api-read.service';

describe('ApiReadService', () => {
  let service: ApiReadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiReadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
