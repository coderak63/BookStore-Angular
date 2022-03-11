import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private username: string ='';
  private password: string ='';

  constructor(private authService : AuthService, private router: Router) { }

  tryAuthentication(){
    this.authService.authenticate(this.username,this.password);
  }

  ngOnInit() {
    if(this.authService.isUserLoggedIn()){
      if(this.authService.getRole()=='USER'){
        this.router.navigate(['user']);
      }else if(this.authService.getRole()=='ADMIN'){
        this.router.navigate(['admin']);
      }
    }
    
  }

}
