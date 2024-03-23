import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisTicketsComponent } from './mis-tickets.component';

describe('MisTicketsComponent', () => {
  let component: MisTicketsComponent;
  let fixture: ComponentFixture<MisTicketsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MisTicketsComponent]
    });
    fixture = TestBed.createComponent(MisTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
