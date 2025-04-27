import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaejercicioComponent } from './categoriaejercicio.component';

describe('CategoriaejercicioComponent', () => {
  let component: CategoriaejercicioComponent;
  let fixture: ComponentFixture<CategoriaejercicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaejercicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaejercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
