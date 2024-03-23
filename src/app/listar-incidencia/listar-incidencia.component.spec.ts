import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarIncidenciaComponent } from './listar-incidencia.component';

describe('ListarIncidenciaComponent', () => {
  let component: ListarIncidenciaComponent;
  let fixture: ComponentFixture<ListarIncidenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarIncidenciaComponent]
    });
    fixture = TestBed.createComponent(ListarIncidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
