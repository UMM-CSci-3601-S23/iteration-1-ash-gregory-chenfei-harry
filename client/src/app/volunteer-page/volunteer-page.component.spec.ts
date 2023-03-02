import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerPageComponent } from './volunteer-page.component';

describe('VolunteerPageComponent', () => {
  let component: VolunteerPageComponent;
  let fixture: ComponentFixture<VolunteerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteerPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
