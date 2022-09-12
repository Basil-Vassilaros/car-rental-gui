import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Car } from 'src/app/models/entity/car.model';
import { CarCategory } from 'src/app/models/entity/carCategory.model';
import { CarModel } from 'src/app/models/entity/carModel.model';
import { CarManufacturer } from 'src/app/models/entity/carManufacturer.model';

import { CarResponse } from 'src/app/models/response/car.response';

import { CarService } from 'src/app/services/Car/car.service';
import { CarCategoryService } from 'src/app/services/Car-Category/car-category.service';
import { CarManufacturerService } from 'src/app/services/Car-Manufacturer/car-manufacturer.service';
import { CarModelService } from 'src/app/services/Car-Model/car-model.service';

@Component({
  selector: 'app-cars.list',
  templateUrl: './cars.list.component.html',
  styleUrls: ['./cars.list.component.css']
})
export class CarsListComponent implements OnInit {
  Title?: String = "Car"
  selectedCar: Car = new Car();
  newCar: CarResponse = new CarResponse();
  currentCar: Car = {};
  currentIndex = -1;
  search: String = "";
  updatedCar: CarResponse = new CarResponse();
  cart: Car = new Car();

  carModels?: CarModel[];
  cars?: Car[];

  message: String = "";

  constructor(
    private CarService: CarService,
    private CarModelService: CarModelService,
    private router: Router
  ) { }

  // For when a feature is still unavailable
  inProgress() {
    console.log("work in progress");
  }

  // Get List of Car Models
  retrieveCarModels(){
    this.CarModelService.getAll()
    .subscribe({
      next: (data) => {
        this.carModels = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  goTo(target: string): void {
    const navigationDetails: string[] = [target];
    this.router.navigate(navigationDetails);
  }
  
  goToTab(target: string): void {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([target])
    );
  
    window.open(url, '_blank');
  }

  // Get List of Cars from DB
  retrieveCars(): void {
    this.CarService.getAll()
      .subscribe({
        next: (data) => {
          this.cars = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  // Load Initial Data
  ngOnInit(): void {
    this.retrieveCars();
    this.retrieveCarModels();
  }

  // Refresh Page Data
  refreshList(): void {
    this.retrieveCars();
    this.retrieveCarModels();
    this.currentCar = {};
    this.currentIndex = -1;
  }

  // When a Car is selected, save that Car in a variable
  selectCar(Car: Car) {
    this.selectedCar = Car;
  }

  selectUpdateModel(model: CarModel){
    this.updatedCar.modelId = model.modelId;
  }

  selectUpdateColor(color: string){
    this.updatedCar.color = color;
  }

  selectNewColor(color: string){
    this.newCar.color = color;
  }

  selectNewModel(model: CarModel){
    this.newCar.modelId = model.modelId;
  }

  selectUpdateCar(Car: Car){
    this.updatedCar.registrationNumber = Car.registrationNumber;
    this.updatedCar.color = Car.color;
    this.updatedCar.price = Car.price;
    this.updatedCar.modelId = Car.carModel?.modelId;
  }

  // Reset newCar to prevent old data persistance
  resetNewCar() {
    this.newCar.registrationNumber = "";
    this.newCar.color = "";
    this.newCar.price = 0;
    this.newCar.modelId = -1;
  }

  // Add a new Car to DB
  addCar() {
    this.CarService.create(this.newCar)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.retrieveCars();
        },
        error: (e) => console.error(e)
      });
  }

  updateCar() {
    this.CarService.update(this.selectedCar.carId, this.updatedCar)
    .subscribe({
      next: (data) => {
        console.log(data);
        this.retrieveCars();
      },
      error: (e) => 
        console.error(e)
      
  });
  }

  // Search for Car
  findCar(): void {
    this.currentCar = {};
    this.currentIndex = -1;

    this.CarService.search(this.search)
      .subscribe({
        next: (data) => {
          this.cars = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


  // Select current Car ????
  setActiveCar(Car: Car, index: number): void {
    this.currentCar = Car;
    this.currentIndex = index;
  }

  noCar: Car[] = []










  // goToDetails($myParam: number = -1): void {
  //   const navigationDetails: string[] = ['/Car-detail/'];
  //   if($myParam > 0) {
  //     var id = $myParam + "";
  //     navigationDetails.push(id);
  //   }
  //   this.router.navigate(navigationDetails);
  // }

  // getPublished() {
  //   if(this.publishedOnly){
  //     if(this.Cars?.length){
  //       return this.Cars.filter((Car) => Car.published == true);
  //     }
  //     else{
  //       this.message = "no Cars found";
  //       return this.noCar;
  //     }
  //   }
  //   else{
  //     return this.Cars
  //   }

  // }





  // removeAllCars(): void {
  //   this.CarService.deleteAll()
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.refreshList();
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }



  // deleteCar() {
  //   this.CarService.delete(this.selectedCar.ID).subscribe(
  //     data => {
  //       console.log(data);
  //       this.retrieveCars();
  //     },
  //     error => {
  //       console.log(error);

  //     }
  //   )
  // }
}
