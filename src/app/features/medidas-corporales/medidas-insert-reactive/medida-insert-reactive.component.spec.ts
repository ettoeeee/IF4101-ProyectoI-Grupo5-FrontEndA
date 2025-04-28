import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedidaInsertReactiveComponent } from './medida-insert-reactive.component';

describe('MedidaInsertReactiveComponent', () => {
  let component: MedidaInsertReactiveComponent;
  let fixture: ComponentFixture<MedidaInsertReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedidaInsertReactiveComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MedidaInsertReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});