import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StoryService {

  baseUri:string = 'http://localhost:3000/stories';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Create
  // TODO(timhsieh): use a better type than 'any' type
  createStory(data: any): Observable<any> {
    let url = `${this.baseUri}/`;
    let storyData = {
      title: data.storyTitle,
      body: data.storyContent,
      status: data.visibilityStatus
    };

    return this.http.post(url, storyData)
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  getStories(): Observable<any> {
    return this.http.get(`${this.baseUri}`);
  }

  getStory(id: string): Observable<any> {
    return this.http.get(`${this.baseUri}/one-story/${id}`);
  }

  getMyStories(): Observable<any> {
    return this.http.get(`${this.baseUri}/my-stories`);
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
