import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Project } from './models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl + 'api/Projects')
    .pipe(
      catchError(this.handleError)
    );
  }

  addProject(project: Project): Observable<Project> {

    return this.http.post<Project>(this.baseUrl + 'api/Projects', project, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteProject(project: Project): Observable<Project> {

    const url = `${this.baseUrl}projects/${project.projectId}`;
    return this.http.delete<Project>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
