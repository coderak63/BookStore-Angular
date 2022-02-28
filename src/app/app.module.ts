import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponentComponent } from './components/main-component/main-component.component';
import { BookComponent } from './components/book/book.component';
import { AddNewBookComponent } from './components/add-new-book/add-new-book.component';
import { AddNewBookCategoryComponent } from './components/add-new-book-category/add-new-book-category.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponentComponent,
    BookComponent,
    AddNewBookComponent,
    AddNewBookCategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
