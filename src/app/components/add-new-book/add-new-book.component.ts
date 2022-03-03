import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/data/Categories';
import { Languages } from 'src/app/data/Languages';
import { Book } from 'src/app/model/Book';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.css']
})
export class AddNewBookComponent implements OnInit {

  
  languages = Languages.languages;
  categories=Categories.categories;
  

  book:Book = new Book();

  category_other:string;
  language_other:string;
  authors:string="";
  constructor(private httpService:HttpService) { }

  ngOnInit() {
  }

  addBook(){
    
    this.book.authors = new Array<string>();
    let authors=this.authors.split(',');
    for(let i=0;i<authors.length;i++){
      let author = authors[i].trim();
      if(author!='')
        this.book.authors.push(author);
    }
    

    if(this.book.category=='Other')
    {
      this.book.category=this.category_other;
    }

    if(this.book.language=='Other')
    {
      this.book.language=this.language_other;
    }
    

    console.log(this.book);

    
    this.httpService.addBook(this.book).subscribe(
      data => {
        console.log(data);
        alert("Book added successfully!");
      },
      error => {
        console.log(error);
        alert("UnSuccessful!");
      }
    )


  }

}
