import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarModelsListComponent } from './car-models.list.component';

describe('CarModelsListComponent', () => {
  let component: CarModelsListComponent;
  let fixture: ComponentFixture<CarModelsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarModelsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarModelsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
