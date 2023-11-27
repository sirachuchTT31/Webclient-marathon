import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerContentComponent } from './organizer-content.component';

describe('OrganizerContentComponent', () => {
  let component: OrganizerContentComponent;
  let fixture: ComponentFixture<OrganizerContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizerContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizerContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
