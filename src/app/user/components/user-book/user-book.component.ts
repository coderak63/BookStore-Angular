import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/Book';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-user-book',
  templateUrl: './user-book.component.html',
  styleUrls: ['./user-book.component.css']
})
export class UserBookComponent implements OnInit {

  @Input() book:Book;
  rating:any = {
    "rating_avg": 0,
    "rating_1": 0,
    "rating_2": 0,
    "rating_3": 0,
    "rating_4": 0,
    "rating_5": 0
}


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
    
    //Fetch image
    this.fetchImage();
    this.fetchRating();
    
  }

  fetchImage(){

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

  }

  fetchRating(){

    this.httpService.getAverageRatingByBookId(this.book.id).subscribe(
      data => {
        this.rating=data;
        this.rating.rating_avg = this.rating.rating_avg.toFixed(2);
        console.log(this.rating);
      },
      error => {
        console.log(error);
      }
    );

  }

  openBookDetails(){
    this.router.navigate(['/user/books/'+this.book.id], {state: {data: this.book}});
  }

}
