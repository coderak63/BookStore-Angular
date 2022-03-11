import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient : HttpClient, private router:Router) { }
  

  authenticate(username, password){
    //sessionStorage.setItem('username','abhi');
    console.log("Login Requested.");
    
    return this.httpClient.post<any>('/api/login',{username,password}).subscribe(
      userData => {
          console.log(userData);
          sessionStorage.setItem('username',username);
          sessionStorage.setItem('role',userData.role);
          let tokenStr= 'Bearer '+userData.token;
          sessionStorage.setItem('token', tokenStr);
          

          if(userData.role=='ADMIN')
          this.router.navigate(['admin']);
          else if(userData.role=='USER')
          this.router.navigate(['user']);


          return userData;
      },
      
      error => {
        console.log(error);
        if(error.status=='404')
          alert("API call unsuccessful");
        else
          alert("Wrong Credentials!");
      }
      
      );

      

  }

  isUserLoggedIn():boolean {
    let user = sessionStorage.getItem('username')
    return !(user === null)
  }

  getRole(){
    return sessionStorage.getItem('role');
  }

  isAdminLoggedIn(){
    return this.isUserLoggedIn() && this.getRole()=='ADMIN';
  }


  logOut(){
    
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
    
  }

  register(username: string, password: string, fullName: string, email: string, role:string = 'USER') {
    console.log("Register Requested.");
    
    return this.httpClient.post<any>('/api/register',{username,password,fullName,email,role}).subscribe(
      userData => {
          if(confirm("Register successful!\nGoto Login Page."))
          this.router.navigate(['login']);

          return userData;
      },
      
      error => {
        console.log(error);
        if(error.status=='404')
          alert("API call unsuccessful");
        else
          alert("User Already exists!");
      }
      
      );
  }
}
