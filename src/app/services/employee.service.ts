import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Employee } from '../model/Employee';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { sharedModel } from '../shared/sharedModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServices {
  hostName:string=sharedModel.localHost;
  constructor(private http:HttpClient) {}

  findSingleEmployeeDetails(id:number):Observable<Employee>{
    let url=`http://${this.hostName}/employee/getEmployeeById/${id}`;
    return this.http.get<Employee>(url).pipe(
      tap((res :Employee) => console.log('data fetched single Employee '+JSON.stringify(res)),
      catchError(this.handleError))
    );
  }

  getAllEmployees(): Observable<Employee[]>{
    let url=`http://${this.hostName}/employee/getAllEmployee`;
    return this.http.get<Employee[]>(url,{responseType: 'json'}).pipe(
        tap((res :Employee[]) => console.log('data fetched All Employees'+JSON.stringify(res)),
        catchError(this.handleError))
        )
    ;
  }

  crateEmployee(employee:Employee):Observable<any>{
    let url=`http://${this.hostName}/employee/create`;
    console.log('passed value ',JSON.stringify(employee));
    
    return this.http.post<string>(url,employee).pipe(
      tap({
        next:res=>console.log(res),
        error: err =>this.handleError(err)
      })
    );  
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    // console.log(' handleError 1 '+JSON.stringify(err));
    // console.log(' handleError 2 '+JSON.stringify(err.error));
    console.log(' value 1 '+JSON.stringify(err));
    console.log(' value 2 '+JSON.stringify(err.error));
    console.log(' value 3 '+JSON.stringify(err.error.message));
    
    let errMsg = '';
    if (err.error instanceof Error) {
      errMsg = err.error.message;
      console.log('An error occurred:', errMsg);
    } else {
      console.log(`Backend returned code ${err.status}`);
      errMsg = err.error.message;
      errMsg = err.error.status;
    }
    return throwError(()=>errMsg);
  }
}
