import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarManufacturerAddComponent } from './car-manufacturer.add.component';

describe('CarManufacturerAddComponent', () => {
  let component: CarManufacturerAddComponent;
  let fixture: ComponentFixture<CarManufacturerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarManufacturerAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarManufacturerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
