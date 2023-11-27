import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardReportContentComponent } from './dashboard-report-content.component';

describe('DashboardReportContentComponent', () => {
  let component: DashboardReportContentComponent;
  let fixture: ComponentFixture<DashboardReportContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardReportContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardReportContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
