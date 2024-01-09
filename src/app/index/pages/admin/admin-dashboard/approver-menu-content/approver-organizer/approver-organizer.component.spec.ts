import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverOrganizerComponent } from './approver-organizer.component';

describe('ApproverOrganizerComponent', () => {
  let component: ApproverOrganizerComponent;
  let fixture: ComponentFixture<ApproverOrganizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproverOrganizerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproverOrganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
