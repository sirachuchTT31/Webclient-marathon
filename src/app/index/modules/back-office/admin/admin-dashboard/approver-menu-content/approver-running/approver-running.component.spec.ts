import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverRunningComponent } from './approver-running.component';

describe('ApproverRunningComponent', () => {
  let component: ApproverRunningComponent;
  let fixture: ComponentFixture<ApproverRunningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproverRunningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproverRunningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
