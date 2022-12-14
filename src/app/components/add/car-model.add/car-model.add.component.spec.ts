import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarModelAddComponent } from './car-model.add.component';

describe('CarModelAddComponent', () => {
  let component: CarModelAddComponent;
  let fixture: ComponentFixture<CarModelAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarModelAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarModelAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
