import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from  '@angular/material/dialog';

import { CoursesService } from './../../../core/services/courses.service';
import { UpdateCourseComponent } from './../update-course/update-course.component';
import { Course } from './../../../core/models/course.model';
import { ConfirmComponent } from 'src/app/components/confirm/confirm.component';
import { MyToastrService } from 'src/app/core/services/toastr.service';

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
    private dialog: MatDialog,
    private toastr: MyToastrService,
    private route: Router
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

  openConfirmModal(): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: true,
      width: '600px',
      height: '200px',
      data: `Deseja excluir o curso ${this.Course['name']}? A ação é irreversível!`
    })

    dialogRef.afterClosed().subscribe(confirmed => {
      if(confirmed){
        this.deleteCourse(this.Course['_id'])
      }
    })
  } 

  deleteCourse(courseId: String): void {
    this.httpRequest = this.coursesService.deleteCourseById(courseId).subscribe(response => {
      this.toastr.showToastrSuccess(`O curso ${this.Course['name']} foi excluído com sucesso`)
      this.route.navigate(['/courses'])
    }, err =>{
      this.toastr.showToastrError(`${err.status} - ${err.error['message']}`)
    })
  }

}
