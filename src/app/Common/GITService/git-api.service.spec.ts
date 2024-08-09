import { TestBed } from '@angular/core/testing';

import { GitAPIService } from './git-api.service';

describe('GitAPIService', () => {
  let service: GitAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GitAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
