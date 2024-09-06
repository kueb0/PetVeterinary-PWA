import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarioSesionComponent } from './veterinario-sesion.component';

describe('VeterinarioSesionComponent', () => {
  let component: VeterinarioSesionComponent;
  let fixture: ComponentFixture<VeterinarioSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeterinarioSesionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VeterinarioSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
