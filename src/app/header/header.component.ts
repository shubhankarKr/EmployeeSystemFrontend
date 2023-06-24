import { Component } from '@angular/core';
import { EmployeeServices } from '../services/employee.service';
import { Employee } from '../model/Employee';
import { HomepageComponent } from '../homepage/homepage.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  value!: string;
  empList: Employee[] = [];

  constructor(private service: EmployeeServices) {}

  getSearchData() {
    console.log('value1 ' + this.value);
    if (this.value) {
      console.log('value 2 ' + this.value);
      this.service.GetSerachData(this.value).subscribe({
        next: (res) => (this.empList = res),
        error: (err) => {
          let erroMessage;
          if (err.error.errors && err.error.errors[0].defaultMessage) {
            erroMessage = err.error.errors[0].defaultMessage;
          } else if (err.error) {
            erroMessage = err.error.message;
            console.log('An error occurred:', erroMessage);
          }
          console.log(err);
        },
      });
    } else {
      this.empList = [];
    }
  }
}
