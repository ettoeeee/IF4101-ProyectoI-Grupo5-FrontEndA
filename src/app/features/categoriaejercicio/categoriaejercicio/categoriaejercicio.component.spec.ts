import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriaEjercicioComponent } from './categoriaejercicio.component';

describe('CategoriaEjercicioComponent', () => {
  let component: CategoriaEjercicioComponent;
  let fixture: ComponentFixture<CategoriaEjercicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaEjercicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaEjercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
