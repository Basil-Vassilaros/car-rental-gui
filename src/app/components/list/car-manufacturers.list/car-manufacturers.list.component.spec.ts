import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarManufacturersListComponent } from './car-manufacturers.list.component';

describe('CarManufacturersListComponent', () => {
  let component: CarManufacturersListComponent;
  let fixture: ComponentFixture<CarManufacturersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarManufacturersListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarManufacturersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
