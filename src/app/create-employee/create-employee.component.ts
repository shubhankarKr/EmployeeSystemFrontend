import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Employee } from '../model/Employee';
import { EmployeeServices } from '../services/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit{
  userForm!:FormGroup
  successMessage!:string
  erroMessage!:string
  constructor(private fb:FormBuilder,private empService:EmployeeServices){}
  ngOnInit(): void {
    this.userForm=this.fb.group({
      firstName:[],
      lastName:[],
      street :[],
      city:[],
      pinCode:[],
      gender:[],
      email:[],
      designation:[],
      skills:  this.fb.array([
        this.fb.control('')
      ])
    });
  }

  getSkills(){
    return this.userForm.get('skills') as FormArray;
  }

  addSkills(){
    this.getSkills().push(this.fb.control(''));
  }
  deleteSkills(i:number){
    const control = <FormArray>this.userForm.controls['skills'];
    control.removeAt(i);
  }
  onSubmit(){
    this.successMessage='';
    this.erroMessage='';
    let firstName=this.userForm.get('firstName')?.value;
    let lastName=this.userForm.get('lastName')?.value;
    let street=this.userForm.get('street')?.value;
    let city=this.userForm.get('city')?.value;
    let pinCode=this.userForm.get('pinCode')?.value;
    let gender=this.userForm.get('gender')?.value;
    let email=this.userForm.get('email')?.value;
    let designation=this.userForm.get('designation')?.value;
    let skills:{skillName:string}[]=this.getSkillsArrary();
    let e=new Employee(firstName, lastName, street, city, pinCode, gender, email, designation); 
    e.skills=skills;

    this.empService.crateEmployee(e).subscribe({
      next : res=>{
        console.log(res);
        console.log(res.response);
        

        this.successMessage=res.response
      },  
      error:err=>{
        // console.log('error has come '+JSON.stringify(err));
        this.erroMessage=err.error.message;      
        console.log(this.erroMessage);
          
      }
    }
    )
  }
  getSkillsArrary() {
    let res:{skillName:string}[]=[];
    let skills=this.userForm.controls['skills'] as FormArray;
    console.log(' skills values ',skills.value);
    skills.value.forEach((element: string) => {
      res.push({skillName:element});
    });
   return res;
  }
  
}

