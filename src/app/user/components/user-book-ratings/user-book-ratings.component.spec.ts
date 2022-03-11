import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookRatingsComponent } from './user-book-ratings.component';

describe('UserBookRatingsComponent', () => {
  let component: UserBookRatingsComponent;
  let fixture: ComponentFixture<UserBookRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBookRatingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBookRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
