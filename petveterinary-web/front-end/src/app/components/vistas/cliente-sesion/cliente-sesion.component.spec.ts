import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteSesionComponent } from './cliente-sesion.component';

describe('ClienteSesionComponent', () => {
  let component: ClienteSesionComponent;
  let fixture: ComponentFixture<ClienteSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteSesionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClienteSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
