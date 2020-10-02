import { Injectable } from '@angular/core'
import { AsyncValidatorFn } from '@angular/forms'
import { map, debounceTime, distinctUntilChanged, switchMap, first } from 'rxjs/operators'
import { InstructorsService } from './../services/instructors.service'

@Injectable({
  providedIn: 'root'
})
export class InstructorValidator {

  constructor(
    private instructorService: InstructorsService
  ) { }

  validatorUniqueInstructorName(): AsyncValidatorFn {
    return control => control.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(value => this.instructorService.validatorUniqueInstructorName(value)),
        map((response) => {
          if (response['data'] == 0 && control.value != null && control.value != '') {
            return { 'instructorNameAlreadyExists': false }
          } else {
            return { 'instructorNameAlreadyExists': true }
          }
        }),
        first()
      )
  }

}