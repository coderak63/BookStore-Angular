import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../model/Book';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient:HttpClient) { }

  getBookById(id: string) {
    return this.httpClient.get<Book>('/api/books/'+id);
  }

  fetchAllBooks() {
    return this.httpClient.get<Book[]>('/api/books');
  }

  editBook(book: Book) {
    let uri = '/api/edit-book/'+book.id;
    return this.httpClient.put(uri,book);
  }

  deleteBook(book: Book) {
    let uri = '/api/delete-book/'+book.id;
    return this.httpClient.delete(uri);
  }
  

}
