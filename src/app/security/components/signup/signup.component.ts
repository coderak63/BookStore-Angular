import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private username:string = '';
  private password:string = '';
  private confirmPassword:string = '';
  private fullName:string = '';
  private email:string = '';
  private role:string = 'USER';

  constructor(private authService : AuthService, private router: Router) { }

  tryRegister(){
    if(this.password!=this.confirmPassword)
    {
      alert("Password and Confirm Password is not same!");
    }else{
      this.authService.register(this.username,this.password,this.fullName,this.email,this.role);
    }
  }

  ngOnInit() {
    if(this.authService.isUserLoggedIn())
    {
      if(this.authService.getRole()=='USER'){
        this.router.navigate(['user']);
      }else if(this.authService.getRole()=='ADMIN'){
        this.router.navigate(['admin']);
      }
    }
  }

}
