import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCategoryDetailsComponent } from './car-category.details.component';

describe('CarCategoryDetailsComponent', () => {
  let component: CarCategoryDetailsComponent;
  let fixture: ComponentFixture<CarCategoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarCategoryDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarCategoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
