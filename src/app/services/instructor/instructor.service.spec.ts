import { TestBed } from '@angular/core/testing';

import { InstructorService } from '/src/services/instructor/instructor.service';

describe('InstructorService', () => {
  let service: InstructorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstructorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
