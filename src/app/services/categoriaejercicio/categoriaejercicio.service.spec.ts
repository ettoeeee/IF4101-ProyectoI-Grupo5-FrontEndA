import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CategoriaEjercicioService } from './categoriaejercicio.service';

describe('CategoriaEjercicioService', () => {
  let service: CategoriaEjercicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CategoriaEjercicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
