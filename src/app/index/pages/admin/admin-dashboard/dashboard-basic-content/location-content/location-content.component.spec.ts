import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationContentComponent } from './location-content.component';

describe('LocationContentComponent', () => {
  let component: LocationContentComponent;
  let fixture: ComponentFixture<LocationContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
