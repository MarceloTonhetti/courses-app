import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from  '@angular/material/dialog';

import { CoursesService } from './../../../core/services/courses.service';
import { UpdateCourseComponent } from './../update-course/update-course.component';
import { Course } from './../../../core/models/course.model';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription
  Course: Course
  hasError: boolean = false
  courseName: String

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.courseName = this.activatedRoute.snapshot.params['courseName']
    this.findCourseByName(this.courseName)
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  findCourseByName(courseName: String): void {
    this.httpRequest = this.coursesService.findCourseByName(courseName).subscribe(response => {
      this.Course = response.body['data']
    }, err => {
      this.hasError = true
    })
  }

  openUpdateCourseModal(): void {
    const dialogRef = this.dialog.open(UpdateCourseComponent, {
      disableClose: true,
      width: '600px',
      height: '600px',
      data: this.Course
    })

    dialogRef.afterClosed().subscribe(updatedCourse => {
      if(updatedCourse){
        this.Course = undefined
        this.findCourseByName(this.courseName)
      }
    })
  }

}
