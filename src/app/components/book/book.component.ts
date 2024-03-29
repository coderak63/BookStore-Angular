import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Book } from 'src/app/model/Book';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

 

  @Input() book:Book;
  @Output() deleteEvent:EventEmitter<Book> = new EventEmitter();
  //@Output() updateEvent:EventEmitter<Book> = new EventEmitter();


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

  openBookDetails(){
    this.router.navigate(['/admin/books/'+this.book.id], {state: {data: this.book}});
  }

  emitForDelete(){
    if(confirm("Click OK to delete")){
      console.log("emitForDelete is called.");
      console.log(this.book);
      this.deleteEvent.emit(this.book);
    }
    
  }

  

  


}
