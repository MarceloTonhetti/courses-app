import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from './../../core/models/course.model';
import { CoursesService } from './../../core/services/courses.service'
import { MatDialog } from '@angular/material/dialog'
import { NewCourseComponent } from './new-course/new-course.component'

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription
  Courses: Course[]
  hasError: boolean = false

  constructor(
    private coursesService: CoursesService,
    private dialog: MatDialog
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
      this.hasError = true
    })
  }

  openNewCourseModal(): void {
    const dialogRef = this.dialog.open(NewCourseComponent, {
      width: '600px',
      height: '600px',
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(newCourseAdded => {
      if (newCourseAdded) {
        this.Courses = undefined
        this.findAllCourses()
      }
    })
  }
}
