import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverPaymentComponent } from './approver-payment.component';

describe('ApproverPaymentComponent', () => {
  let component: ApproverPaymentComponent;
  let fixture: ComponentFixture<ApproverPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproverPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproverPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
