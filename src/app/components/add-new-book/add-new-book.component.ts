import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/model/Book';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.css']
})
export class AddNewBookComponent implements OnInit {

  languages:string[] = 
  [
    "English (US)",
    "English (UK)",
    "Hindi",
    "Amharic",
    "Arabic",
    "Basque",
    "Bengali",
    "Portuguese (Brazil)",
    "Bulgarian",
    "Catalan",
    "Cherokee",
    "Croatian",
    "Czech",
    "Danish",
    "Dutch",
    "Estonian",
    "Filipino",
    "Finnish",
    "French",
    "German",
    "Greek",
    "Gujarati",
    "Hebrew",
    "Hungarian",
    "Icelandic",
    "Indonesian",
    "Italian",
    "Japanese",
    "Kannada",
    "Korean",
    "Latvian",
    "Lithuanian",
    "Malay",
    "Malayalam",
    "Marathi",
    "Norwegian",
    "Polish",
    "Portuguese",
    "Romanian",
    "Russian",
    "Serbian",
    "Chinese",
    "Slovak",
    "Slovenian",
    "Spanish",
    "Swahili",
    "Swedish",
    "Tamil",
    "Telugu",
    "Thai",
    "Chinese (Taiwan)",
    "Turkish",
    "Urdu",
    "Ukrainian",
    "Vietnamese",
    "Welsh"
  ]

  categories:string[] = 
  [
    "Technology",
    "Language",
    "Novel",
    "History",
    "Action and adventure",
    "Art/architecture",
    "Autobiography",
    "Anthology",
    "Biography",
    "Business/economics",
    "Children's",
    "Crafts/hobbies",
    "Comic",
    "Crime",
    "Diary",
    "Dictionary",
    "Drama",
    "Fairytale",
    "Fantasy",
    "Guide",
    "Health/fitness",
    "Home and garden",
    "Humor",
    "Horror",
    "Journal",
    "Mystery",
    "Math",
    "Philosophy",
    "Poetry",
    "Prayer",
    "Politics",
    "Religion, spirituality, and new age",
    "Romance",
    "Science fiction",
    "Short story",
    "Science",
    "Suspense",
    "Sports",
    "Thriller",
    "Textbook",
    "Travel"
  ]

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
