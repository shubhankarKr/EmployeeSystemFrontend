import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/Employee';
import { ActivatedRoute, Route } from '@angular/router';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  constructor(private route:ActivatedRoute,private api:EmployeeService){}
  ngOnInit(): void {
    console.log(' single employee called');
    let id =this.route.snapshot.params['id'];
    this.findSingleEmployeeDetails(id);
  }
  employee!:Employee

  findSingleEmployeeDetails(id:number){
    this.api.findSingleEmployeeDetails(id).subscribe({
      next : res=>this.employee=res
    })
  }
}
