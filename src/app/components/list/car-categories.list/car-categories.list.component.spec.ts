import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCategoriesListComponent } from './car-categories.list.component';

describe('CarCategoriesListComponent', () => {
  let component: CarCategoriesListComponent;
  let fixture: ComponentFixture<CarCategoriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarCategoriesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
