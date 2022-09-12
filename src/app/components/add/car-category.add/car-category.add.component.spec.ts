import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCategoryAddComponent } from './car-category.add.component';

describe('CarCategoryAddComponent', () => {
  let component: CarCategoryAddComponent;
  let fixture: ComponentFixture<CarCategoryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarCategoryAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarCategoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
