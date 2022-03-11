import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Rating } from '../../model/Rating';

@Component({
  selector: 'app-user-book-ratings',
  templateUrl: './user-book-ratings.component.html',
  styleUrls: ['./user-book-ratings.component.css']
})
export class UserBookRatingsComponent implements OnInit {

  @Input() book_id:string;
  username:string="User";

  rating:any = {
    "rating_avg": 0,
    "rating_1": 0,
    "rating_2": 0,
    "rating_3": 0,
    "rating_4": 0,
    "rating_5": 0
  }

  rating_percent = {
    "rating_1": 0,
    "rating_2": 0,
    "rating_3": 0,
    "rating_4": 0,
    "rating_5": 0
  }


  rating_total:any=0;

  my_rating_added:boolean=true;
  my_rating:Rating;
  
  all_ratings:Rating[];

  constructor(private httpService:HttpService) { 
    
  }

  ngOnInit() {
    this.fetchRating();
    this.fetchMyRating();
    this.fetchAllRatings();
    this.username=sessionStorage.getItem('username');
    this.my_rating= new Rating(this.book_id,this.username,0,"","");
  }

  fetchRating(){

    this.httpService.getAverageRatingByBookId(this.book_id).subscribe(
      data => {
        this.rating=data;
        this.rating_total=this.rating.rating_1+this.rating.rating_2+this.rating.rating_3+this.rating.rating_4+this.rating.rating_5;
        if(this.rating_total!=0){
          this.rating_percent.rating_1=(this.rating.rating_1/this.rating_total)*100;
          this.rating_percent.rating_2=(this.rating.rating_2/this.rating_total)*100;
          this.rating_percent.rating_3=(this.rating.rating_3/this.rating_total)*100;
          this.rating_percent.rating_4=(this.rating.rating_4/this.rating_total)*100;
          this.rating_percent.rating_5=(this.rating.rating_5/this.rating_total)*100;
        }
        document.getElementById("rating_1").style.width=this.rating_percent.rating_1+'%';
        document.getElementById("rating_2").style.width=this.rating_percent.rating_2+'%';
        document.getElementById("rating_3").style.width=this.rating_percent.rating_3+'%';
        document.getElementById("rating_4").style.width=this.rating_percent.rating_4+'%';
        document.getElementById("rating_5").style.width=this.rating_percent.rating_5+'%';

        this.fillStars(this.rating.rating_avg);
        this.rating.rating_avg = this.rating.rating_avg.toFixed(2);
        console.log(this.rating);
      },
      error => {
        console.log(error);
      }
    );

  }

  fetchMyRating(){
    this.httpService.getMyRatingByBookId(this.book_id).subscribe(
      data => {
        
        this.my_rating=data;
        console.log("My rating");
        console.log(this.my_rating);
        this.fillModalStars(this.my_rating.rating);
        
      },
      error => {
        console.log(error);
        this.my_rating_added=false;
      }
    );
  }

  fetchAllRatings(){
    this.httpService.getAllRatingByBookId(this.book_id).subscribe(
      data => {
        
        this.all_ratings=data;
        console.log("All ratings:")
        console.log(data);
        
      },
      error => {
        console.log(error);
      }
    );
  }

  fillStars(rating){
    let r=Math.floor(rating);
    let i=1;
    for(;i<=r;i++)
    {
      let id="star_"+i;
      document.getElementById(id).className="fa fa-star";
    }

    if(rating-r>0){
      let id="star_"+i;
      document.getElementById(id).className="fa fa-star-half-o";
    }
  }


  fillModalStars(rating){
    
    let r=Math.floor(rating);
    let i=1;
    for(;i<=r;i++)
    {
      let id="modal_rating_"+i;
      document.getElementById(id).style.opacity="1"
    }

    


  }


  hideModal(basicModal){
    basicModal.hide();
  }

  sendReviews(basicModal){
   
    console.log(this.my_rating);
    this.httpService.postMyRatingByBookId(this.my_rating).subscribe(
      data => {
        console.log(data);
        this.my_rating_added=true;
        this.fetchRating();
        this.fetchMyRating();
        basicModal.hide();
      },
      error => {
        console.log(error);
        basicModal.hide();
      }

    )

    
  }


}
