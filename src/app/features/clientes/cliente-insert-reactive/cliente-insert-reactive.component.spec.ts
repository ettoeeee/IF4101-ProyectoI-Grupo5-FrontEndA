import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteInsertReactiveComponent } from './cliente-insert-reactive.component';

describe('ClienteInsertReactiveComponent', () => {
  let component: ClienteInsertReactiveComponent;
  let fixture: ComponentFixture<ClienteInsertReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteInsertReactiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteInsertReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
