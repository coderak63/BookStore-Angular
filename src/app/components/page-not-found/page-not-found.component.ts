import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  status:any="404";
  statusText:any="Page Not Found!";

  constructor(private router:Router) {
    
    if(this.router.getCurrentNavigation().extras.state){
      console.log(this.router.getCurrentNavigation().extras.state);
      this.status=this.router.getCurrentNavigation().extras.state.status;

      if(this.status=="404")
      this.statusText="Page Not Found!";
      else if(this.status=="401")
      {
        this.router.navigate(['logout']);
      }
      else
      this.statusText=this.router.getCurrentNavigation().extras.state.statusText;
    }
    
   }

  ngOnInit() {
  }

}
