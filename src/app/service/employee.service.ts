import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Employee } from '../model/Employee';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  findSingleEmployeeDetails(id:number):Observable<Employee>{
    let url=`http://localhost:8080/employee/getEmployeeById/${id}`;
    return this.http.get<Employee>(url).pipe(
      tap((res :Employee) => console.log('data fetched single Employee '+JSON.stringify(res)),
      catchError(this.handleError))
    );
    console.log(id);
  }

  getAllEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>('http://localhost:8080/employee/getAllEmployee',{responseType: 'json'}).pipe(
        tap((res :Employee[]) => console.log('data fetched All Employees'+JSON.stringify(res)),
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
