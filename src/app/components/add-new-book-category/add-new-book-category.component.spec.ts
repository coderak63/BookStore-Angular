import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBookCategoryComponent } from './add-new-book-category.component';

describe('AddNewBookCategoryComponent', () => {
  let component: AddNewBookCategoryComponent;
  let fixture: ComponentFixture<AddNewBookCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewBookCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewBookCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
