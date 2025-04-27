import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EjercicioService } from './ejercicio.service';

describe('EjercicioService', () => {
  let service: EjercicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(EjercicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
