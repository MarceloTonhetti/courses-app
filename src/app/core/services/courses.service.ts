import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from './../models/course.model';
import { API_URL } from './../api';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(
    private http: HttpClient
  ) { }

  findAllCourses(): Observable<HttpResponse<Course[]>> {
    return this.http.get<Course[]>(`${API_URL}/course/viewAll`, { observe: 'response' })
  }

  findCourseByName(courseName: String): Observable<HttpResponse<Course>> {
    return this.http.get<Course>(`${API_URL}/course/viewOne/${courseName}`, { observe: 'response' })
  }

  createNewCourse(body: Course): Observable<HttpResponse<Course>> {
    return this.http.post<Course>(`${API_URL}/course/create`, body, { observe: 'response' })
  }
}
