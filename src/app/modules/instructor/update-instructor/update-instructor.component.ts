import { Component, OnInit, OnDestroy,ViewChild, Inject } from '@angular/core';
import { Instructor } from './../../../core/models/instructor.model';
import { InstructorsService } from 'src/app/core/services/instructors.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MyToastrService } from 'src/app/core/services/toastr.service';

@Component({
  selector: 'app-update-instructor',
  templateUrl: './update-instructor.component.html',
  styleUrls: ['./update-instructor.component.css']
})
export class UpdateInstructorComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription

  InstructorUpdate: Instructor
  instructorFormGroup: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) data: Instructor,
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<UpdateInstructorComponent>,
    private instructorsService: InstructorsService,
    private toastr: MyToastrService
  ) { 
    this.InstructorUpdate = data
  }

  ngOnInit(): void {
    this.initializeInstructorFormGroup()
    this.populateInstructorFormGroup()
  }

  ngOnDestroy(): void{
    this.httpRequest.unsubscribe()
  }

  initializeInstructorFormGroup(): void {
    this.instructorFormGroup = this.builder.group({
      image: this.builder.control(null)
    })
  }

  populateInstructorFormGroup(): void {
    this.instructorFormGroup.patchValue({
      image: this.InstructorUpdate['image'],
    })
  }

  updateInstructor(): void{
    this.httpRequest = this.instructorsService.updateInstructorById(this.InstructorUpdate['_id'], this.instructorFormGroup.value).subscribe(response =>{
      this.toastr.showToastrSuccess(`O instrutor ${this.InstructorUpdate['name']} foi atualizado com sucesso`)
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
