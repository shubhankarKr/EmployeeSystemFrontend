import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/Employee';
import { EmployeeServices } from '../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent  implements OnInit {
  employeeList!:Employee[];
  errorMessage!:string
  constructor(private api:EmployeeServices,private route:Router){}

  ngOnInit(): void {
    this.api.getAllEmployees().subscribe(
      {
        next : res=>this.employeeList=res,
        error: err=>this.errorMessage=err
      }
    );
  }

}
