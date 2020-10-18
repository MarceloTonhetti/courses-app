import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from  '@angular/material/dialog';

import { InstructorsService } from './../../../core/services/instructors.service';
import { UpdateInstructorComponent } from './../../instructor/update-instructor/update-instructor.component'
import { Instructor } from './../../../core/models/instructor.model';

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
    private instructorService: InstructorsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.instructorName = this.activatedRoute.snapshot.params['instructorName']
    this.findInstructorByName(this.instructorName)
  }

  ngOnDestroy(): void {
    this.httpRequest.unsubscribe()
  }

  findInstructorByName(instructorName: String): void {
    this.httpRequest = this.instructorService.findInstructorByName(instructorName).subscribe(response => {
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

}
