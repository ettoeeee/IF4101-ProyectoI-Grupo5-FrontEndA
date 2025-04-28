import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EjercicioService } from './ejercicio.service';

describe('EjercicioService', () => {
  let service: EjercicioService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(EjercicioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should upload a photo for the exercise', () => {
    const dummyFile = new File(['dummy content'], 'photo.jpg', { type: 'image/jpeg' });
    const formData = new FormData();
    formData.append('foto', dummyFile, 'photo.jpg');

    service.subirFoto(formData).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:8080/bulk-gym/api/fotografias');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
