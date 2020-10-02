import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Instructor } from './../models/instructor.model';
import { API_URL } from './../api';

@Injectable({
  providedIn: 'root'
})
export class InstructorsService {

  constructor(
    private http: HttpClient
  ) { }

  findAllInstructors(): Observable<HttpResponse<Instructor[]>> {
    return this.http.get<Instructor[]>(`${API_URL}/instructor/viewAll`, { observe: 'response' })
  }

  createNewInstructor(body: Instructor): Observable<HttpResponse<Instructor>> {
    return this.http.post<Instructor>(`${API_URL}/instructor/create`, body, { observe: 'response' })
  }

  validatorUniqueInstructorName(instructorName: string) {
    let myParams = new HttpParams()

    myParams = myParams.append('name', instructorName)
    return this.http.get<any>(`${API_URL}/instructor/validadeInstructorName`, { params: myParams })
  }
}
