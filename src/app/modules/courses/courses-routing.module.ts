import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './../courses/courses.component'
import { CourseDetailComponent } from './../../modules/courses/course-detail/course-detail.component'

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent
  },
  {
    path: 'detail/:courseId',
    component: CourseDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
