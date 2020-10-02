import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { InstructorsService } from './../../../core/services/instructors.service';
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private instructorService: InstructorsService
  ) { }

  ngOnInit(): void {
    const instructorName = this.activatedRoute.snapshot.params['instructorName']
    this.findInstructorByName(instructorName)
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

}
