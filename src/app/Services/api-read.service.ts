import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse, HttpHeaders  } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Employee } from '../model/Employee';

@Injectable({
  providedIn: 'root'
})
export class ApiReadService {

  constructor(private http :HttpClient ) { }

  login(email:string,password:string):Observable<string>{
    const body={'email':email,'password':password};
    let url='http://localhost:8080/employee/login';
    return this.http.post<string>(url,body).pipe(
      tap(res=>console.log('res vavlue '+JSON.stringify(res))),
      catchError(this.handleError)
    );
  }

  getAllEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>('http://localhost:8080/employee/getAllEmployee',{responseType: 'json'}).pipe(
        tap((res :Employee[]) => console.log('data fetched '+JSON.stringify(res)),
        catchError(this.handleError))
        )
    ;
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    console.log(' error '+JSON.stringify(err));
    
    let errMsg = '';
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', err.error.message);
      errMsg = err.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(`Backend returned code ${err.status}`);
      errMsg = err.error.status;
    }
    return throwError(()=>errMsg);
  }

}
