import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutinasPorClienteComponent } from './rutinas-por-cliente.component';

describe('RutinasPorClienteComponent', () => {
  let component: RutinasPorClienteComponent;
  let fixture: ComponentFixture<RutinasPorClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutinasPorClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutinasPorClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
