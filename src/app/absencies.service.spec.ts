import { TestBed } from '@angular/core/testing';

import { AbsenciesService } from './absencies.service';

describe('AbsenciesService', () => {
  let service: AbsenciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbsenciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
