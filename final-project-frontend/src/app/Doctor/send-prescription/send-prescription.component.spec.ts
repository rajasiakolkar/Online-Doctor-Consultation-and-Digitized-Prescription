import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendPrescriptionComponent } from './send-prescription.component';

describe('SendPrescriptionComponent', () => {
  let component: SendPrescriptionComponent;
  let fixture: ComponentFixture<SendPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
