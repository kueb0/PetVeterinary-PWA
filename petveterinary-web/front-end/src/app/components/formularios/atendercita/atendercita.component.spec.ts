import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendercitaComponent } from './atendercita.component';

describe('AtendercitaComponent', () => {
  let component: AtendercitaComponent;
  let fixture: ComponentFixture<AtendercitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtendercitaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtendercitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
