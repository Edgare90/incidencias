import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDepartamentosComponent } from './agregar-departamentos.component';

describe('AgregarDepartamentosComponent', () => {
  let component: AgregarDepartamentosComponent;
  let fixture: ComponentFixture<AgregarDepartamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarDepartamentosComponent]
    });
    fixture = TestBed.createComponent(AgregarDepartamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
