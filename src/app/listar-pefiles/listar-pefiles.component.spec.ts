import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPefilesComponent } from './listar-pefiles.component';

describe('ListarPefilesComponent', () => {
  let component: ListarPefilesComponent;
  let fixture: ComponentFixture<ListarPefilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarPefilesComponent]
    });
    fixture = TestBed.createComponent(ListarPefilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
