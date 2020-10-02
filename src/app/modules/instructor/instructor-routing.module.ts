import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructorComponent } from './../instructor/instructor.component'
/* INSTRUCTORDETAIL import { CourseDetailComponent } from './../../modules/courses/course-detail/course-detail.component'*/

const routes: Routes = [
  {
    path: '',
    component: InstructorComponent
  }
  /*  {
      path: 'detail/:courseName',
      component: CourseDetailComponent
    }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule { }