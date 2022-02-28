import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewBookCategoryComponent } from './components/add-new-book-category/add-new-book-category.component';
import { AddNewBookComponent } from './components/add-new-book/add-new-book.component';
import { MainComponentComponent } from './components/main-component/main-component.component';

const routes: Routes = [
  { path: '', component: MainComponentComponent},
  { path: 'add_book', component: AddNewBookComponent },
  { path: 'add_category', component: AddNewBookCategoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
