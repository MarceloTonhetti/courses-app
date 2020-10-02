import { Component, OnInit, Input } from '@angular/core';
import { Course } from './../../../core/models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {

  @Input() Course: Course

  constructor() { }

  ngOnInit(): void {
  }

  sliceDescription(value: String): String {
    return `${value.slice(0, 100)}...`
  }

}