import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewBookComponent } from './components/add-new-book/add-new-book.component';
import { BookViewComponent } from './components/book-view/book-view.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
  
  {path:'', component: LayoutComponent, children:[
    { path: '', component: HomeComponent },
    { path: 'books/:id', component: BookViewComponent },
    { path: 'add_book', component: AddNewBookComponent }
    ]},
  {path:'error', component: PageNotFoundComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
