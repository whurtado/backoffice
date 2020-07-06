import { TestBed } from '@angular/core/testing';

import { SmptServerService } from './smpt-server.service';

describe('SmptServerService', () => {
  let service: SmptServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmptServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
