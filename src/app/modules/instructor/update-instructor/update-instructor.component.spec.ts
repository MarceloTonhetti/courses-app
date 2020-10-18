import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInstructorComponent } from './update-instructor.component';

describe('UpdateInstructorComponent', () => {
  let component: UpdateInstructorComponent;
  let fixture: ComponentFixture<UpdateInstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateInstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
