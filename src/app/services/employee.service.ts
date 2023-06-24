import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Employee } from '../model/Employee';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { sharedModel } from '../shared/sharedModel';

@Injectable({
  providedIn: 'root',
})
export class EmployeeServices {
  hostName: string = sharedModel.localHost;
  empList!: Employee[];
  error!: any;
  constructor(private http: HttpClient) {}

  findSingleEmployeeDetails(id: number): Observable<Employee> {
    let url = `http://${this.hostName}/employee/getEmployeeById/${id}`;
    return this.http
      .get<Employee>(url)
      .pipe(
        tap(
          (res: Employee) =>
            console.log('data fetched single Employee ' + JSON.stringify(res)),
          catchError(this.handleError)
        )
      );
  }

  getAllEmployees(): Observable<Employee[]> {
    let url = `http://${this.hostName}/employee/getAllEmployee`;
    return this.http
      .get<Employee[]>(url, { responseType: 'json' })
      .pipe(
        tap(
          (res: Employee[]) => console.log('data fetched All Employees'),
          catchError(this.handleError)
        )
      );
  }

  crateEmployee(employee: Employee): Observable<any> {
    let url = `http://${this.hostName}/employee/create`;
    console.log('passed value ', JSON.stringify(employee));

    return this.http.post<string>(url, employee).pipe(
      tap({
        next: (res) => console.log(res),
        error: (err) => err,
      })
    );
  }
  GetSerachData(searchBy: string): Observable<Employee[]> {
    let url = `http://${this.hostName}/employee/search/${searchBy}`;
    console.log('url value ' + url);

    return this.http.get<Employee[]>(url).pipe(
      tap({
        next: (res) => console.log(res),
        error: (err) => {
          console.log('error for search employee' + err);
        },
      })
    );
  }

  getEmpList() {
    return this.empList;
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    // console.log(' handleError  '+JSON.stringify(err.error));
    let errMsg = '';
    if (err.error.errors && err.error.errors[0].defaultMessage) {
      errMsg = err.error.errors[0].defaultMessage;
      console.log(' loop 2 ' + err.error.errors[0].defaultMessage);
    } else if (err.error) {
      console.log(' loop 1 ' + JSON.stringify(err.error.message));
      errMsg = err.error.message;
      console.log('An error occurred:', errMsg);
    } else {
      console.log(' loop 3');
      errMsg = err.error.argumentNotValidError;
      errMsg = err.error.status;
    }
    console.log(' throwwing error');
    let error = new Error(errMsg);
    console.log(error.message);

    return throwError(errMsg);
  }
}
