import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructorComponent } from './../instructor/instructor.component'
import { InstructorDetailComponent } from './../../modules/instructor/instructor-detail/instructor-detail.component'

const routes: Routes = [
  {
    path: '',
    component: InstructorComponent
  },
  {
    path: 'detail/:instructorName',
    component: InstructorDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule { }