import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { CoursesService } from './../../../core/services/courses.service';
import { Course } from './../../../core/models/course.model';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription
  Course: Course

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService
  ) { }

  ngOnInit(): void {
    const courseName = this.activatedRoute.snapshot.params['courseName']
    this.findCourseByName(courseName)
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  findCourseByName(courseName: String): void {
    this.httpRequest = this.coursesService.findCourseByName(courseName).subscribe(response => {
      this.Course = response.body['data']
    }, err => {
      console.log(err)
    })
  }

}
