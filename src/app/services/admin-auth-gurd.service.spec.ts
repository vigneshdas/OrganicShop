import { TestBed } from '@angular/core/testing';

import { AdminAuthGurdService } from './admin-auth-gurd.service';

describe('AdminAuthGurdService', () => {
  let service: AdminAuthGurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAuthGurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
