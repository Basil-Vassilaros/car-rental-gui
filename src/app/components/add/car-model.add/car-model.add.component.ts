import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarCategory } from 'src/app/models/entity/carCategory.model';
import { CarManufacturer } from 'src/app/models/entity/carManufacturer.model';
import { CarModel } from 'src/app/models/entity/carModel.model';
import { CarModelResponse } from 'src/app/models/response/carModel.response';
import { CarCategoryService } from 'src/app/services/Car-Category/car-category.service';
import { CarManufacturerService } from 'src/app/services/Car-Manufacturer/car-manufacturer.service';
import { CarModelService } from 'src/app/services/Car-Model/car-model.service';

@Component({
  selector: 'app-car-model.add',
  templateUrl: './car-model.add.component.html',
  styleUrls: ['./car-model.add.component.css']
})
export class CarModelAddComponent implements OnInit {
  carModel: CarModelResponse = new CarModelResponse();
  categories?: CarCategory[];
  manufacturers?: CarManufacturer[];
  models?: CarModel[];
  submitted = false;
  defaultYear: Number = new Date().getFullYear();

  errMsg = "";
  errYear = "";
  errModel = "";

  errorExist = false;

  entity = "Car Model";

  constructor(
    private carModelService: CarModelService,
    private carCategoryService: CarCategoryService,
    private carManufacturerService: CarManufacturerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.new();
    this.retrieveCategories();
    this.retrieveManufacturers();
    this.retrieveModels();
  }

  retrieveModels() {
    this.carModelService.getAll().subscribe({
      next: (data) => {
        this.models = data;
      },
      error: (e) => console.error(e.error)
    })
  }

  retrieveCategories() {
    this.carCategoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (e) => console.error(e.error)
    })
  }

  retrieveManufacturers() {
    this.carManufacturerService.getAll().subscribe({
      next: (data) => {
        this.manufacturers = data;
      },
      error: (e) => console.error(e.error)
    })
  }

  selectManufacturer(manufacturer: CarManufacturer) {
    this.carModel.manufacturerId = manufacturer.manufacturerId;
  }

  selectCategory(category: CarCategory) {
    this.carModel.categoryId = category.categoryId;
  }

  checkYear() {
    let year = this.carModel.year?.valueOf();
    if (!(new Number(this.carModel.year) <= this.defaultYear && new Number(this.carModel.year) > 1990)) {
      this.errYear = "Select a valid year from 1990-" + this.defaultYear;
      this.errorExist = true;
    }
    else{
      this.errYear = "";
      this.errorExist = false;
    }
  }

  checkValidInput(){
    if(this.carModel.carModel == ""){
      this.errModel = "Enter a model";
      this.errorExist = true;
    }
    else{
      this.errModel = "";
      this.errorExist = false;
    }
    if(this.carModel.year == ""){
      this.errYear = "Enter a year";
      this.errorExist = true;
    }
    else{
      this.errYear = "";
      this.errorExist = false;
    }
  }

  save(): void {
    this.checkValidInput();
    this.checkYear();
    if(!this.errorExist){
      this.carModelService.create(this.carModel)
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
    this.carModel = {
      carModel: '',
      categoryId: 1,
      year: this.defaultYear.toString(),
      manufacturerId: 1
    };
  }

  goTo(target: string): void {
    const navigationDetails: string[] = [target];
    this.router.navigate(navigationDetails);
  }

}
