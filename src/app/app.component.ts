import { Component, OnInit } from '@angular/core';
import { ApiReadService } from './Services/api-read.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  ngOnInit(){
    
  }
  title = 'EmployeeSystemFrontend';
  constructor(private bookService: ApiReadService){}
  books!:any[]
  errorMessage:any 
  selectVal:string='';

  getBooks() {
    this.bookService.getData().subscribe({
      next:  books => this.books = books,
      error:error => this.errorMessage = <any>error
    })
  }

  call(data:string){
    console.log(' call called '+data);
  }

}
