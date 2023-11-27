import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPaymentContentComponent } from './dashboard-payment-content.component';

describe('DashboardPaymentContentComponent', () => {
  let component: DashboardPaymentContentComponent;
  let fixture: ComponentFixture<DashboardPaymentContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPaymentContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPaymentContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
