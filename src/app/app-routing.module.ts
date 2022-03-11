import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewBookComponent } from './components/add-new-book/add-new-book.component';
import { BookViewComponent } from './components/book-view/book-view.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './security/components/login/login.component';
import { LogoutComponent } from './security/components/logout/logout.component';
import { SignupComponent } from './security/components/signup/signup.component';
import { AuthGuard } from './security/guard/auth.guard';
import { UserBookViewComponent } from './user/components/user-book-view/user-book-view.component';
import { UserHomeComponent } from './user/components/user-home/user-home.component';
import { UserLayoutComponent } from './user/components/user-layout/user-layout.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },

  { path: 'user', component: UserLayoutComponent, children:[
    { path: '', component: UserHomeComponent , canActivate: [AuthGuard]},
    { path: 'books/:id', component: UserBookViewComponent , canActivate: [AuthGuard]},
  ],
  canActivate: [AuthGuard],  
  data: {
    role: 'USER'
  }
  },

  {path:'admin', component: LayoutComponent, children:[
    { path: '', component: HomeComponent , canActivate: [AuthGuard]},
    { path: 'books/:id', component: BookViewComponent , canActivate: [AuthGuard]},
    { path: 'add_book', component: AddNewBookComponent , canActivate: [AuthGuard]}
    ],
  canActivate: [AuthGuard],
  data: {
        role: 'ADMIN'
      }
  },
  {path:'error', component: PageNotFoundComponent},
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', pathMatch: 'full', redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
