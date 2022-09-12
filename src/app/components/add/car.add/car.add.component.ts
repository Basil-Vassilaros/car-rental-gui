import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarModel } from 'src/app/models/entity/carModel.model';
import { CarResponse } from 'src/app/models/response/car.response';
import { CarModelService } from 'src/app/services/Car-Model/car-model.service';
import { CarService } from 'src/app/services/Car/car.service';

@Component({
  selector: 'app-car.add',
  templateUrl: './car.add.component.html',
  styleUrls: ['./car.add.component.css']
})
export class CarAddComponent implements OnInit {
  newCar: CarResponse = new CarResponse();
  models?: CarModel[];
  submitted = false;
  defualtModel?: CarModel;

  errMsg = "";
  errReg = "";
  errCol = "";
  errPrc = "";
  searchPhrase: String = "";

  errorExist = false;

  entity = "Car";

  constructor(
    private carService: CarService,
    private carModelService: CarModelService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.new();
    this.retrieveModels();
  }

  searchModel(){
    if (this.searchPhrase == "") {
      this.retrieveModels();
    }
    else {
      this.carModelService.search(this.searchPhrase)
        .subscribe({
          next: (data) => {
            this.models = data;
            console.log(data);
          },
          error: (e) => console.error(e)
        });
    }
  }

  retrieveModels() {
    this.carModelService.getAll().subscribe({
      next: (data) => {
        this.models = data;
        this.defualtModel = this.models[0];
      },
      error: (e) => console.error(e.error)
    })
  }

  selectModel(model: CarModel) {
    this.defualtModel = model;
    this.newCar.modelId = model.modelId;
  }
  
  // Price must be above 0
  // Registration Number must have a value
  // Color must have a value
  checkValidInput(){
    if(this.newCar.price != undefined){
      if(this.newCar.price < 0){
        this.errPrc = "Price of car must be above 0";
        this.errorExist = true;
      }
      else{
        this.errPrc = "";
        this.errorExist = false;
      }
    }
    if(this.newCar.color == ""){
      this.errCol = "Enter a color";
      this.errorExist = true;
    }
    else{
      this.errCol = "";
      this.errorExist = false;
    }
    if(this.newCar.registrationNumber == ""){
      this.errReg = "Enter a Registration Number";
      this.errorExist = true;
    }
    else{
      this.errReg = "";
      this.errorExist = false;
    }
  }

  saveCar(): void {
    this.checkValidInput();
    if(!this.errorExist){
      this.carService.create(this.newCar)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => {
          console.error(e);
          if (e.status == 202) {
            this.submitted = true;
            this.retrieveModels();
          }
          else {
            this.errMsg = e.error;
          }
        }
      });
    }
    else{
      this.errMsg = "There are invalid fields"
    }
    
  }

  new(): void {
    this.submitted = false;
    this.newCar = {
      modelId: 1,
      registrationNumber: '',
      color: '',
      price: 0
    };
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

}
