import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionRutinasComponent } from './gestion-rutinas.component';

describe('GestionRutinasComponent', () => {
  let component: GestionRutinasComponent;
  let fixture: ComponentFixture<GestionRutinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionRutinasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionRutinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
