import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categories } from 'src/app/data/Categories';
import { Languages } from 'src/app/data/Languages';
import { Book } from 'src/app/model/Book';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit {

  book:Book;
  book_original:Book;

  edit_clicked = {
    "title":false,
    "description":false,
    "authors":false,
    "isbn":false,
    "publisher":false,
    "language":false,
    "price":false,
    "category":false,
    "page_count":false,
    "image_url":false
  }

  languages = Languages.languages;
  categories = Categories.categories;

  modal_language_other:string="";
  modal_category_other:string="";
  authors:string="";

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
    this.httpService.getBookById(id).subscribe(
      data => {
          this.book_original=data;
          this.book = Object.assign({}, this.book_original);
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

  hideModal(basicModal){
    this.edit_clicked.title=false;
    this.edit_clicked.description=false;
    this.edit_clicked.authors=false;
    this.edit_clicked.isbn=false;
    this.edit_clicked.publisher=false;
    this.edit_clicked.language=false;
    this.edit_clicked.price=false;
    this.edit_clicked.category=false;
    this.edit_clicked.page_count=false;
    this.edit_clicked.image_url=false;

    basicModal.hide();
  }

  editBookDetails(basicModal)
  {
    console.log(this.edit_clicked);

    let bookItemJson;

    if(this.edit_clicked.title){
        bookItemJson = {
            "title":this.book.title
        }
        
    }else if(this.edit_clicked.description){
      bookItemJson = {
        "description":this.book.description
      }

    }else if(this.edit_clicked.authors){
      let temp_authors_list:string[] = new Array<string>();
      let authors=this.book.authors.toString().split(',');
      for(let i=0;i<authors.length;i++){
          let author = authors[i].trim();
          if(author!='')
          temp_authors_list.push(author);
        }

      this.book.authors = temp_authors_list;

      bookItemJson = {
        "authors":this.book.authors
      }

    }else if(this.edit_clicked.isbn){
      bookItemJson = {
        "isbn":this.book.isbn
      }

    }else if(this.edit_clicked.publisher){
      bookItemJson = {
        "publisher":this.book.publisher
      }

    }else if(this.edit_clicked.language){
      if(this.book.language=='Other')
      {
        this.book.language=this.modal_language_other;
      }

      bookItemJson = {
        "language":this.book.language
      }

    }else if(this.edit_clicked.price){
      bookItemJson = {
        "price":this.book.price
      }

    }else if(this.edit_clicked.category){
      if(this.book.category=='Other')
      {
        this.book.category=this.modal_category_other;
      }

      bookItemJson = {
        "category":this.book.category
      }

    }else if(this.edit_clicked.page_count){
      bookItemJson = {
        "page_count":this.book.page_count
      }

    }

    this.httpService.editBookItem(this.book,bookItemJson).subscribe(
      data => {
          console.log(data);
          this.book_original = Object.assign(bookItemJson, this.book);
          this.hideModal(basicModal);
      },
      error => {
        console.log(error);
        this.book = Object.assign({}, this.book_original);
        this.hideModal(basicModal);
        alert("Some error occured");
      }
    );
    
  }


  updateImage(){
    let input = document.createElement('input');
  input.type = 'file';
  input.onchange = _ => {
            //use this method to get file and perform respective operations
            let files =   Array.from(input.files);
            console.log(files[0]);

            this.loadingImage = true
            this.imageLoadError=false
            this.httpService.updateImage(files[0],this.book.id,this.book.title).subscribe(
              imageData => {
                  console.log(imageData);
                  this.imageModel=imageData;
              },
              imageError => {
                  console.log(imageError);
                  this.imageLoadError=true
              }
            )

        };
  input.click();
  }


}
