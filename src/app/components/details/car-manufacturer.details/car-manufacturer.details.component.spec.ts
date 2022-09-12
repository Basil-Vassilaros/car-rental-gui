import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarManufacturerDetailsComponent } from './car-manufacturer.details.component';

describe('CarManufacturerDetailsComponent', () => {
  let component: CarManufacturerDetailsComponent;
  let fixture: ComponentFixture<CarManufacturerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarManufacturerDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarManufacturerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
