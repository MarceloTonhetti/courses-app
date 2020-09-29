import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';


@NgModule({
  declarations: [
    CoursesComponent,
    CourseCardComponent,
    CourseDetailComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MatCardModule,
    FlexLayoutModule
  ]
})
export class CoursesModule { }
