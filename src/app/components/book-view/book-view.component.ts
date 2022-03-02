import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/Book';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit {

  book:Book;

  constructor(private httpService:HttpService, private router:Router) { }

  ngOnInit() {
    let url=this.router.url;
    let id=url.split('/').pop();
    this.httpService.getBookById(id).subscribe(
      data => {
          this.book=data;
          console.log(data);
      },
      error => {
        console.log(error);
        this.router.navigate(['/error'], { state: { status: error.status, statusText: error.statusText} });
      }
    );
  }

}
