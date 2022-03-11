import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/Book';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-user-book-view',
  templateUrl: './user-book-view.component.html',
  styleUrls: ['./user-book-view.component.css']
})
export class UserBookViewComponent implements OnInit {

  book:Book;
  book_id:string;


  imageModel:any={
    image:{
      data:null
    }
  }

  loadingImage: boolean = true
  onImageLoad() {
    this.loadingImage = false;
  }
  imageLoadError: boolean = false

  constructor(private httpService:HttpService, private router:Router) { }



  ngOnInit() {
    let url=this.router.url;
    let id=url.split('/').pop();
    this.book_id=id;
    this.httpService.getBookById(id).subscribe(
      data => {
          this.book=data;
          console.log(data);

          //Fetch image
          this.httpService.getImageByBookId(this.book.id).subscribe(
            imageData => {
              this.imageModel=imageData;
              console.log(this.imageModel);
            },
            imageError => {
              console.log(imageError);
              this.imageLoadError=true;
            }
          );


      },
      error => {
        console.log(error);
        this.router.navigate(['/error'], { state: { status: error.status, statusText: error.statusText} });
      }
    );

    
  }

}
