import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeLocationComponent } from './see-location.component';

describe('SeeLocationComponent', () => {
  let component: SeeLocationComponent;
  let fixture: ComponentFixture<SeeLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
