import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardIndexContentComponent } from './dashboard-index-content.component';

describe('DashboardIndexContentComponent', () => {
  let component: DashboardIndexContentComponent;
  let fixture: ComponentFixture<DashboardIndexContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardIndexContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardIndexContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
