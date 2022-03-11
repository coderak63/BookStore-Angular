import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookViewComponent } from './user-book-view.component';

describe('UserBookViewComponent', () => {
  let component: UserBookViewComponent;
  let fixture: ComponentFixture<UserBookViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBookViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBookViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
