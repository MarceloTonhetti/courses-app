import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from  '@angular/material/dialog';

import { InstructorsService } from './../../../core/services/instructors.service';
import { UpdateInstructorComponent } from './../../instructor/update-instructor/update-instructor.component'
import { Instructor } from './../../../core/models/instructor.model';
import { ConfirmComponent } from './../../../components/confirm/confirm.component';
import { MyToastrService } from './../../../core/services/toastr.service';

@Component({
  selector: 'app-instructor-detail',
  templateUrl: './instructor-detail.component.html',
  styleUrls: ['./instructor-detail.component.css']
})
export class InstructorDetailComponent implements OnInit, OnDestroy {

  private httpRequest: Subscription
  Instructor: Instructor
  hasError: boolean = false
  instructorName: String

  constructor(
    private activatedRoute: ActivatedRoute,
    private instructorsService: InstructorsService,
    private dialog: MatDialog,
    private toastr: MyToastrService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.instructorName = this.activatedRoute.snapshot.params['instructorName']
    this.findInstructorByName(this.instructorName)
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  findInstructorByName(instructorName: String): void {
    this.httpRequest = this.instructorsService.findInstructorByName(instructorName).subscribe(response => {
      this.Instructor = response.body['data']
    }, err => {
      this.hasError = true
    })
  }

  openUpdateInstructorModal(): void {
    const dialogRef = this.dialog.open(UpdateInstructorComponent, {
      disableClose: true,
      width: '600px',
      height: '250px',
      data: this.Instructor
    })

    dialogRef.afterClosed().subscribe(updatedCourse => {
      if(updatedCourse){
        this.Instructor = undefined
        this.findInstructorByName(this.instructorName)
      }
    })
  }

  openConfirmModal(): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: true,
      width: '600px',
      height: '200px',
      data: `Deseja excluir o instrutor ${this.Instructor['name']}? Todos os cursos relacionados a ele também serão excluídos, a ação é irreversível!`
    })

    dialogRef.afterClosed().subscribe(confirmed => {
      if(confirmed){
        this.deleteInstructor(this.Instructor['_id'])
      }
    })
  } 

  deleteInstructor(instructorId: String): void {
    this.httpRequest = this.instructorsService.deleteInstructorById(instructorId).subscribe(response => {
      this.toastr.showToastrSuccess(`O instrutor ${this.Instructor['name']} foi excluído com sucesso`)
      this.route.navigate(['/instructors'])
    }, err =>{
      this.toastr.showToastrError(`${err.status} - ${err.error['message']}`)
    })
  }

}
