import { Component, Input, OnInit } from '@angular/core';
import { Instructor } from './../../../core/models/instructor.model';

@Component({
  selector: 'app-instructor-card',
  templateUrl: './instructor-card.component.html',
  styleUrls: ['./instructor-card.component.css']
})
export class InstructorCardComponent implements OnInit {

  @Input() Instructor: Instructor

  constructor() { }

  ngOnInit(): void {
  }

}