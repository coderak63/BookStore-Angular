import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BookComponent } from './components/book/book.component';
import { AddNewBookComponent } from './components/add-new-book/add-new-book.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { BookViewComponent } from './components/book-view/book-view.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './security/components/login/login.component';
import { LogoutComponent } from './security/components/logout/logout.component';
import { SignupComponent } from './security/components/signup/signup.component';
import { UserHomeComponent } from './user/components/user-home/user-home.component';
import { AuthHttpInterceptorService } from './security/services/auth-http-interceptor.service';
import { UserLayoutComponent } from './user/components/user-layout/user-layout.component';
import { UserBookComponent } from './user/components/user-book/user-book.component';
import { UserBookViewComponent } from './user/components/user-book-view/user-book-view.component';
import { UserBookRatingsComponent } from './user/components/user-book-ratings/user-book-ratings.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BookComponent,
    AddNewBookComponent,
    HomeComponent,
    BookViewComponent,
    PageNotFoundComponent,
    LayoutComponent,
    LoginComponent,
    LogoutComponent,
    SignupComponent,
    UserHomeComponent,
    UserLayoutComponent,
    UserBookComponent,
    UserBookViewComponent,
    UserBookRatingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
