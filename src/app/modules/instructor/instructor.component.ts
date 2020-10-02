import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Instructor } from './../../core/models/instructor.model';
import { InstructorsService } from './../../core/services/instructors.service'
import { MatDialog } from '@angular/material/dialog'
/*import { NewCourseComponent } from './new-course/new-course.component'*/

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription
  Instructors: Instructor[]
  hasError: boolean = false

  constructor(
    private instructorsService: InstructorsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.findAllInstructors()
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  findAllInstructors(): void {
    this.httpRequest = this.instructorsService.findAllInstructors().subscribe(response => {
      this.Instructors = response.body['data']
      console.log(response.body['data'])
    }, err => {
      this.hasError = true
    })
  }

  openNewInstructorModal(): void {
    /*const dialogRef = this.dialog.open(NewInstructorComponent, {
      width: '600px',
      height: '600px',
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(newCourseAdded => {
      if (newCourseAdded) {
        this.Courses = undefined
        this.findAllCourses()
      }
    })*/
  }

}