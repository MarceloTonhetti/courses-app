import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatStepperModule } from '@angular/material/stepper'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'

import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorComponent } from './instructor.component';

/*import { CourseCardComponent } from './course-card/course-card.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';*/
import { ComponentsModule } from './../../components/components.module';
import { InstructorCardComponent } from './instructor-card/instructor-card.component';
import { InstructorDetailComponent } from './instructor-detail/instructor-detail.component';
import { CoursesModule } from './../courses/courses.module';
import { NewInstructorComponent } from './new-instructor/new-instructor.component'
/*import { NewCourseComponent } from './new-course/new-course.component'*/

@NgModule({
  declarations: [
    InstructorComponent,
    InstructorCardComponent,
    InstructorDetailComponent,
    NewInstructorComponent/*,
    CourseCardComponent,
    CourseDetailComponent,
    NewCourseComponent*/
  ],
  imports: [
    CommonModule,
    InstructorRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    ComponentsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CoursesModule
  ]
})
export class InstructorModule { }