import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
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
}
