import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesTabComponent } from './clientes-tab.component';

describe('ClientesTabComponent', () => {
  let component: ClientesTabComponent;
  let fixture: ComponentFixture<ClientesTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
