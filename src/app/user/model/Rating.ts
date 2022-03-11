export class Rating{
    book_id:string
    rating:number
    username:string
    title:string
    review:string

    
    constructor(book_id,username,rating,title,review){
        this.book_id=book_id;
        this.username=username;
        this.rating=rating;
        this.title=title;
        this.review=review;
    }
    
}