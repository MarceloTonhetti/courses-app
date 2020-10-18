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
import { MatIconModule } from '@angular/material/icon'

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { ComponentsModule } from './../../components/components.module';
import { NewCourseComponent } from './new-course/new-course.component';
import { UpdateCourseComponent } from './update-course/update-course.component'


@NgModule({
  declarations: [
    CoursesComponent,
    CourseCardComponent,
    CourseDetailComponent,
    NewCourseComponent,
    UpdateCourseComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
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
    MatIconModule
  ],
  exports: [

  ]
})
export class CoursesModule { }