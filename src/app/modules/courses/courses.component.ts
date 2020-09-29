import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from './../../core/models/course.model';
import { CoursesService } from './../../core/services/courses.service'

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription
  Courses: Course[]

  constructor(
    private coursesService: CoursesService
  ) { }

  ngOnInit(): void {
    this.findAllCourses()
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  findAllCourses(): void {
    this.httpRequest = this.coursesService.findAllCourses().subscribe(response => {
      this.Courses = response.body['data']
      console.log(response.body['data'])
    }, err => {
      console.log(err)
    })
  }
}
