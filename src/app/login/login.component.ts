import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted!: boolean;
  constructor(private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    console.log(' ngON called');
    this.loginForm=this.formBuilder.group({
      name : ['',Validators.required],
      password : ['']
      }
    );
  }

  sumbit(){
    console.log(' from status ' +this.loginForm.valid)
  }
}