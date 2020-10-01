import { Injectable } from '@angular/core'
import { AsyncValidatorFn } from '@angular/forms'
import { map, debounceTime, distinctUntilChanged, switchMap, first } from 'rxjs/operators'
import { CoursesService } from './../services/courses.service'

@Injectable({
  providedIn: 'root'
})
export class CourseValidator {

  constructor(
    private courseService: CoursesService
  ) { }

  validatorUniqueCourseName(): AsyncValidatorFn {
    return control => control.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(value => this.courseService.validatorUniqueCourseName(value)),
        map((response) => {
          if (response['data'] == 0 && control.value != null && control.value != '') {
            return { 'courseNameAlreadyExists': false }
          } else {
            return { 'courseNameAlreadyExists': true }
          }
        }),
        first()
      )
  }

}