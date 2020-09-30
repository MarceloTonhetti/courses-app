import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Instructor } from './../../../core/models/instructor.model';
import { InstructorsService } from './../../../core/services/instructors.service';
import { MyToastrService } from './../../../core/services/toastr.service';
import { CoursesService } from './../../../core/services/courses.service';


@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css']
})
export class NewCourseComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription

  instructorFormGroup: FormGroup
  isNewInstructor: boolean = false
  instructors: Instructor[]
  stepInstructorLabel: String = 'Instrutor'
  courseFormGroup: FormGroup

  @ViewChild('autosize') autosize: CdkTextareaAutosize

  constructor(
    private instructorService: InstructorsService,
    private courseService: CoursesService,
    private builder: FormBuilder,
    private toastr: MyToastrService,
    private dialogRef: MatDialogRef<NewCourseComponent>
  ) { }

  ngOnInit(): void {
    this.findAllInstructors()
    this.initializeSelectInstructorFormGroup()
    this.initializeCourseFormGroup()
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  findAllInstructors(): void {
    this.httpRequest = this.instructorService.findAllInstructors().subscribe(response => {
      this.instructors = response.body['data']
    }, err => {
      console.log(err.error['message'])
    })
  }

  initializeSelectInstructorFormGroup(): void {
    this.instructorFormGroup = this.builder.group({
      instructor: this.builder.control(null, [Validators.required])
    })
  }

  initializeNewInstructorFormGroup(): void {
    this.instructorFormGroup = this.builder.group({
      name: this.builder.control(null, [Validators.required]),
      image: this.builder.control(null)
    })
  }

  initializeCourseFormGroup(): void {
    this.courseFormGroup = this.builder.group({
      name: this.builder.control(null, [Validators.required]),
      platform: this.builder.control(null, [Validators.required]),
      numberClasses: this.builder.control(null, [Validators.required]),
      image: this.builder.control(null, [Validators.required]),
      modules: this.builder.control(null),
      description: this.builder.control(null, [Validators.required]),
      instructor: this.builder.control(null, [Validators.required])
    })
  }

  newInstructor(): void {
    this.isNewInstructor = !this.isNewInstructor
    this.initializeNewInstructorFormGroup()
  }

  selectInstructor(): void {
    this.isNewInstructor = !this.isNewInstructor
    this.findAllInstructors()
    this.initializeSelectInstructorFormGroup()
  }

  nextStep(): void {
    if (this.isNewInstructor) {
      this.createNewInstructor(this.instructorFormGroup.value)
    } else {
      this.courseFormGroup.controls['instructor'].setValue(this.instructorFormGroup.value['instructor']['_id'])
      this.stepInstructorLabel = `Instrutor: ${this.instructorFormGroup.value['instructor']['name']}`
    }
  }

  createNewInstructor(formValueInstructor: Instructor): void {
    this.httpRequest = this.instructorService.createNewInstructor(formValueInstructor).subscribe(response => {
      this.courseFormGroup.controls['instructor'].setValue(response.body['data']['_id'])
      this.stepInstructorLabel = `Instrutor: ${response.body['data']['name']}`
      this.toastr.showToastrSuccess(`O instrutor ${response.body['data']['name']} foi adicionado com sucesso`)
    }, err => {
      this.toastr.showToastrError(`${err.error['message']}`)
    })
  }

  createNewCourse(): void {
    this.httpRequest = this.courseService.createNewCourse(this.courseFormGroup.value).subscribe(response => {
      this.toastr.showToastrSuccess(`O curso ${response.body['data']['name']} foi adicionado com sucesso`)
      this.dialogRef.close(true)
    }, err => {
      this.toastr.showToastrError(`${err.error['message']}`)
      this.dialogRef.close(false)
    })
  }

  closeDialog(): void {
    this.dialogRef.close(false)
  }
}
