import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinictimeComponent } from './clinictime.component';

describe('ClinictimeComponent', () => {
  let component: ClinictimeComponent;
  let fixture: ComponentFixture<ClinictimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinictimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinictimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
