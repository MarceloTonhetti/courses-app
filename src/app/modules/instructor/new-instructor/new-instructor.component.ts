import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Instructor } from './../../../core/models/instructor.model';
import { InstructorsService } from './../../../core/services/instructors.service';
import { MyToastrService } from './../../../core/services/toastr.service';
import { CoursesService } from './../../../core/services/courses.service';
import { InstructorValidator } from './../../../core/validators/instructor.validator'
import { CourseValidator } from './../../../core/validators/course.validator'

@Component({
  selector: 'app-new-instructor',
  templateUrl: './new-instructor.component.html',
  styleUrls: ['./new-instructor.component.css']
})
export class NewInstructorComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription

  instructorFormGroup: FormGroup
  isNewInstructor: boolean = true
  instructors: Instructor[]
  stepInstructorLabel: String = 'Instrutor'
  courseFormGroup: FormGroup

  constructor(
    private instructorService: InstructorsService,
    private builder: FormBuilder,
    private toastr: MyToastrService,
    private dialogRef: MatDialogRef<NewInstructorComponent>,
    private instructorValidator: InstructorValidator,
  ) { }

  ngOnInit(): void {
    this.initializeNewInstructorFormGroup()
  }

  ngOnDestroy(): void {
  }

  initializeNewInstructorFormGroup(): void {
    this.instructorFormGroup = this.builder.group({
      name: this.builder.control(null, [Validators.required], this.instructorValidator.validatorUniqueInstructorName()),
      image: this.builder.control(null)
    })
  }

  createNewInstructor(): void {
    this.httpRequest = this.instructorService.createNewInstructor(this.instructorFormGroup.value).subscribe(response => {
      this.toastr.showToastrSuccess(`O instrutor ${response.body['data']['name']} foi adicionado com sucesso`)
      this.httpRequest.unsubscribe()
      this.dialogRef.close(false)
    }, err => {
      this.toastr.showToastrError(`${err.error['message']}`)
      this.httpRequest.unsubscribe()
      this.dialogRef.close(false)
    })
  }

  closeDialog(): void {
    this.dialogRef.close(false)
  }

  instructorNameExists(): boolean {
    return this.instructorFormGroup.get('name').hasError('instructorNameAlreadyExists')
  }

}
