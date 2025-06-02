import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrenadorLayoutComponent } from './entrenador-layout.component';

describe('EntrenadorLayoutComponent', () => {
  let component: EntrenadorLayoutComponent;
  let fixture: ComponentFixture<EntrenadorLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrenadorLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrenadorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
