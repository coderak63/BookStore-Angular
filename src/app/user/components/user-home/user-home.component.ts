import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/Book';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

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

  

  searchFilter(searchForm){
    let text = searchForm.form.value.searchBox;
    text = text.toLowerCase();
    console.log(text);
    let allBooks_temp = this.allFetchedBooks.filter(function(book){
    let exist = book.title.toLowerCase().includes(text) 
                  || book.description.toLowerCase().includes(text)
                  || book.isbn.toLowerCase().includes(text)
                  || book.authors.toString().toLowerCase().includes(text)
                  || book.publisher.toLowerCase().includes(text)
                  || book.language.toLowerCase().includes(text)
                  || book.category.toLowerCase().includes(text);
      return exist;
    });

    this.allBooks=allBooks_temp;
  }

}
