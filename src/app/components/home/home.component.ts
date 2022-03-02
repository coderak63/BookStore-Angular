import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/Book';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private httpService:HttpService, private router:Router) { }

  allFetchedBooks:Book[];
  allBooks:Book[];

  ngOnInit() {
    this.httpService.fetchAllBooks().subscribe(
      (data) => {
        
          this.allFetchedBooks=data;
          this.allBooks=data;
          
          console.log(this.allBooks);
          
      },

      error => {
        console.log(error);
        this.router.navigate(['/error'], { state: { status: error.status, statusText: error.statusText} });
      }
    )
  }



  deleteBook(book:Book){
    this.httpService.deleteBook(book).subscribe(
      data => {    
          console.log(data);
      },

      error => {
          console.log(error);
          alert("Deletion unsuccessful!")
      }
    )
  }


  onSortChange(value){
    //console.log(value);
    
    
    switch(value){
      case "1":
        //console.log("case1");
        this.allBooks.sort((a,b)=> a.title.localeCompare(b.title));
        break;
      case "2":
        //console.log("case2");
        this.allBooks.sort((a,b)=> a.date_created.localeCompare(b.date_created));
        break;
    }

    
  }

}
