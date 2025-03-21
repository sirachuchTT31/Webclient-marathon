import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPaymentDetailComponent } from './modal-payment-detail.component';

describe('ModalPaymentDetailComponent', () => {
  let component: ModalPaymentDetailComponent;
  let fixture: ComponentFixture<ModalPaymentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPaymentDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPaymentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
