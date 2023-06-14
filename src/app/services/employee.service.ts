import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Employee } from '../model/Employee';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { sharedModel } from '../shared/sharedModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServices {
  hostName:string=sharedModel.host;
  constructor(private http:HttpClient) {}

  findSingleEmployeeDetails(id:number):Observable<Employee>{
    let url=`http://${this.hostName}/employee/getEmployeeById/${id}`;
    return this.http.get<Employee>(url).pipe(
      tap((res :Employee) => console.log('data fetched single Employee '+JSON.stringify(res)),
      catchError(this.handleError))
    );
    console.log(id);
  }

  getAllEmployees(): Observable<Employee[]>{
    let url=`http://${this.hostName}/employee/getAllEmployee`;
    return this.http.get<Employee[]>(url,{responseType: 'json'}).pipe(
        tap((res :Employee[]) => console.log('data fetched All Employees'+JSON.stringify(res)),
        catchError(this.handleError))
        )
    ;
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    console.log(' handleError '+JSON.stringify(err));
    let errMsg = '';
    if (err.error instanceof Error) {
      console.log('An error occurred:', err.error.message);
      errMsg = err.error.message;
    } else {
      console.log(`Backend returned code ${err.status}`);
      errMsg = err.error.status;
    }
    return throwError(()=>errMsg);
  }
}
