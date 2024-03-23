import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarIncidenciaComponent } from './agregar-incidencia.component';

describe('AgregarIncidenciaComponent', () => {
  let component: AgregarIncidenciaComponent;
  let fixture: ComponentFixture<AgregarIncidenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarIncidenciaComponent]
    });
    fixture = TestBed.createComponent(AgregarIncidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
