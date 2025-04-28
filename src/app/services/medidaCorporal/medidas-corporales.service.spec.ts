import { TestBed } from '@angular/core/testing';


import { MedidasCorporalesService } from '../medidaCorporal//medidas-corporales.service';


describe('MedidasCorporalesService', () => {
  let service: MedidasCorporalesService;


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedidasCorporalesService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
