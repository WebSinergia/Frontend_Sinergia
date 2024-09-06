import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { catchError, Observable, retry, throwError } from 'rxjs';
import { UserCreate, UserGet } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class InscripcionesService {
  //basePath = 'http://127.0.0.1:8000/conferencia/user';
  basePath = 'https://backend-sinergia.onrender.com/conferencia/user';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  // API Error Handling
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default error handling
      console.log(`An error occurred: ${error.error.message} `);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    // Return Observable with Error Message to Client
    return throwError(
      () => new Error('Something happened with request, please try again later')
    );
  }

  getUserList(): Observable<any[]> {
    const url = `${this.basePath}/list`;
    return this.http
      .get<any[]>(url)
      .pipe(retry(2), catchError(this.handleError));
  }

  getUserByDni(dni: string): Observable<any[]> {
    const url = `${this.basePath}/search?dni=${dni}`;
    return this.http
      .get<any[]>(url)
      .pipe(retry(2), catchError(this.handleError));
  }

  getUserByID(id: number): Observable<any[]> {
    const url = `${this.basePath}/search-id?id=${id}`;
    return this.http
      .get<any[]>(url)
      .pipe(retry(2), catchError(this.handleError));
  }

  editUserById(id: string): Observable<any> {
    const url = `${this.basePath}/confirm/${id}`;
    return this.http
      .put<any>(url, null)
      .pipe(retry(2), catchError(this.handleError));
  }

  createUser(user: any): Observable<any> {
    const url = `${this.basePath}/create`;
    return this.http
      .post<any>(url, user)
      .pipe(retry(2), catchError(this.handleError));
  }

  checkAsistenceDay1(id: number): Observable<any[]> {
    const url = `${this.basePath}/asistence?id=${id}`;
    return this.http
      .get<any[]>(url)
      .pipe(retry(2), catchError(this.handleError));
  }

  getImageByZone(zone_id: number): Observable<any[]> {
    const url = `${this.basePath}/payment/${zone_id}`;
    return this.http
      .get<any[]>(url)
      .pipe(retry(2), catchError(this.handleError));
  }
}
