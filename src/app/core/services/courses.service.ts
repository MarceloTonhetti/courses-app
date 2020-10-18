import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
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

  validatorUniqueCourseName(courseName: string) {
    let myParams = new HttpParams()

    myParams = myParams.append('name', courseName)
    return this.http.get<any>(`${API_URL}/course/validadeCourseName`, { params: myParams })
  }

  updateCourseById(courseId: String, body: Course): Observable<HttpResponse<Course>> {
    return this.http.put<Course>(`${API_URL}/course/update/${courseId}`, body, { observe: 'response' })
  }

  deleteCourseById(courseId: String): Observable<HttpResponse<Course>> {
    return this.http.delete<Course>(`${API_URL}/course/delete/${courseId}`, { observe: 'response' })
  }
}
