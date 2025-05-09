import { TestBed } from '@angular/core/testing';

import { ClienteSeleccionadoService } from './cliente-seleccionado.service';

describe('ClienteSeleccionadoService', () => {
  let service: ClienteSeleccionadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteSeleccionadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
