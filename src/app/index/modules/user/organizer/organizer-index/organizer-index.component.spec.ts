import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerIndexComponent } from './organizer-index.component';

describe('OrganizerIndexComponent', () => {
  let component: OrganizerIndexComponent;
  let fixture: ComponentFixture<OrganizerIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizerIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizerIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
