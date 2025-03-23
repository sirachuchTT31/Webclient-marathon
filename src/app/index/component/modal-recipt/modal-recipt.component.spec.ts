import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReciptComponent } from './modal-recipt.component';

describe('ModalReciptComponent', () => {
  let component: ModalReciptComponent;
  let fixture: ComponentFixture<ModalReciptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalReciptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalReciptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
