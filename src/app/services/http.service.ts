import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../model/Book';
import { Rating } from '../user/model/Rating';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient:HttpClient) { }

  

  fetchAllBooks() {
    return this.httpClient.get<Book[]>('/api/books');
  }

  getBookById(id: string) {
    return this.httpClient.get<Book>('/api/books/'+id);
  }

  addBook(book: Book){
    return this.httpClient.post<Book>('/api/books',book);
  }

  editBook(book: Book) {
    let uri = '/api/books/'+book.id;
    return this.httpClient.put(uri,book);
  }

  deleteBook(book: Book) {
    let uri = '/api/books/'+book.id;
    return this.httpClient.delete(uri);
  }

  editBookItem(book,bookItemsJson) {
    let uri = '/api/books/'+book.id;
    return this.httpClient.patch(uri,bookItemsJson);
  }

  uploadImage(image_file:File,book_id:string,title:string){
    // Create form data
    const formData = new FormData(); 
        
    // Store form name as "file" with file data
    formData.append("image", image_file);
    formData.append("book_id", book_id);
    formData.append("title", title);

    return this.httpClient.post<Book>('/api/photos',formData);
  }

  updateImage(image_file:File,book_id:string,title:string){
    // Create form data
    const formData = new FormData(); 
        
    // Store form name as "file" with file data
    formData.append("image", image_file);
    formData.append("book_id", book_id);
    formData.append("title", title);

    return this.httpClient.put<Book>('/api/photos',formData);
  }

  getImageByBookId(book_id:string){
    return this.httpClient.get<Observable<any>>('/api/photos/book-id/'+book_id);
  }
  

  getAverageRatingByBookId(book_id:string){
    return this.httpClient.get<Observable<any>>('/api/ratings/average/'+book_id);
  }

  getMyRatingByBookId(book_id:string){
    let username= sessionStorage.getItem('username');
    return this.httpClient.get<Rating>('/api/ratings/username/'+username+'/'+book_id);
  }

  getAllRatingByBookId(book_id:string){
    return this.httpClient.get<Rating[]>('/api/ratings/'+book_id);
  }

  postMyRatingByBookId(rating:Rating){
    return this.httpClient.post<Rating>('/api/ratings',rating);
  }

}
