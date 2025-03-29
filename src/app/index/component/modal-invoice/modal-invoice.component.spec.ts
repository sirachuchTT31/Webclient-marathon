import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInvoiceComponent } from './modal-invoice.component';

describe('ModalInvoiceComponent', () => {
  let component: ModalInvoiceComponent;
  let fixture: ComponentFixture<ModalInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
