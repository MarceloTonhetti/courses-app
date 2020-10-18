import { Component, Inject, OnInit, OnDestroy,ViewChild } from '@angular/core';
import { Course } from './../../../core/models/course.model';
import { Instructor } from './../../../core/models/instructor.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InstructorsService } from 'src/app/core/services/instructors.service';
import { CoursesService } from 'src/app/core/services/courses.service';
import { Subscription } from 'rxjs';
import { MyToastrService } from 'src/app/core/services/toastr.service';



@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription

  CourseUpdate: Course
  courseFormGroup: FormGroup
  instructors: Instructor[]

  @ViewChild('autosize') autosize: CdkTextareaAutosize

  constructor(
    @Inject(MAT_DIALOG_DATA) data: Course,
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<UpdateCourseComponent>,
    private instructorsService: InstructorsService,
    private coursesService: CoursesService,
    private toastr: MyToastrService
  ) {
    this.CourseUpdate = data
  }

  ngOnInit(): void {
    this.findAllInstructors()
    this.initializeCourseFormGroup()
    this.populateCourseFormGroup()
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  findAllInstructors(): void{
    this.httpRequest = this.instructorsService.findAllInstructors().subscribe(response => {
      this.instructors = response.body['data']
    }, err => {
      this.toastr.showToastrError(`${err.status} - ${err.error['message']}`)
    })
  }

  initializeCourseFormGroup(): void {
    this.courseFormGroup = this.builder.group({
      platform: this.builder.control(null, [Validators.required]),
      numberClasses: this.builder.control(null, [Validators.required]),
      image: this.builder.control(null, [Validators.required]),
      description: this.builder.control(null, [Validators.required]),
      instructor: this.builder.control(null, [Validators.required]),
      modules: this.builder.control(null)
    })
  }

  populateCourseFormGroup(): void {
    this.courseFormGroup.patchValue({
      platform: this.CourseUpdate['platform'],
      numberClasses: this.CourseUpdate['numberClasses'],
      image: this.CourseUpdate['image'],
      description: this.CourseUpdate['description'],
      instructor: this.CourseUpdate['instructor'],
      modules: this.CourseUpdate['modules']
    })
  }

  compareInstructor(i1: Instructor, i2: Instructor): boolean {
    return i1 && i2 ? i1._id === i2._id: i1 === i2
  }

  updateCourse(): void{
    this.httpRequest = this.coursesService.updateCourseById(this.CourseUpdate['_id'], this.courseFormGroup.value).subscribe(response =>{
      this.toastr.showToastrSuccess(`O curso ${this.CourseUpdate['name']} foi atualizado com sucesso`)
      this.closeDialog(true)
    }, err => {
      this.toastr.showToastrError(`${err.status} - ${err.error['message']}`)
      this.closeDialog()
    })
  }

  closeDialog(b: boolean = false): void {
    this.dialogRef.close(b)
  }

}
