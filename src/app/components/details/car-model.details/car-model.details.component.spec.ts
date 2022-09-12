import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarModelDetailsComponent } from './car-model.details.component';

describe('CarModelDetailsComponent', () => {
  let component: CarModelDetailsComponent;
  let fixture: ComponentFixture<CarModelDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarModelDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarModelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
