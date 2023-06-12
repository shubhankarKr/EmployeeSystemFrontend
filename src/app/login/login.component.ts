import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiReadService } from '../Services/api-read.service';
import { Employee } from '../model/Employee';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  employees!:Employee[];
  errorMessage!:string
  userLoginForm!:FormGroup
  messageFromLogin!:any
  constructor(private fb:FormBuilder,private service:ApiReadService){}
  ngOnInit(): void {
    this.userLoginForm=this.fb.group({
      email :['',Validators.email],
      password : []
    });
  }
  getAllEmployees(){
    console.log('get Employees called ');
    
    this.service.getAllEmployees().subscribe({
      next : res=>this.employees=res,
      error : er=> this.errorMessage
    })
  }

  login(){
    this.service.login('shubhankar@gmail.com','pass').subscribe({
      next : res=>(this.messageFromLogin=res),
      error : err=>err
    })
    
  }
  
}