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
  selector: 'app-car-models.list',
  templateUrl: './car-models.list.component.html',
  styleUrls: ['./car-models.list.component.css']
})
export class CarModelsListComponent implements OnInit {
  entity = "Model"
  models?: CarModel[];
  categories?: CarCategory[];
  manufacturers?: CarManufacturer[];
  selectedModel: CarModel = new CarModel();
  selectedUpdateModel: CarModelResponse = new CarModelResponse();
  searchPhrase: String = "";
  errorExist = false;
  errorMessage = "";
  errorYear = "";
  defaultYear: Number = new Date().getFullYear();

  constructor(
    private carModelService: CarModelService,
    private carManufacturerService: CarManufacturerService,
    private carCategoryService: CarCategoryService,
    
    private router: Router
  ) { }

  ngOnInit(): void {
    this.retrieveModel();
    this.retrieveManufacturers();
    this.retrieveCategories();
  }

  goTo(target: string): void {
    const navigationDetails: string[] = [target];
    this.router.navigate(navigationDetails);
  }

  retrieveModel(){
    this.carModelService.getAll().subscribe({
      next: (data) => {
        this.models = data;
      },
      error: (e) => console.error(e.error)
    })
  }

  retrieveManufacturers(){
    this.carManufacturerService.getAll().subscribe({
      next: (data) => {
        this.manufacturers = data;
      },
      error: (e) => console.error(e.error)
    })
  }

  retrieveCategories(){
    this.carCategoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (e) => console.error(e.error)
    })
  }

  selectManufacturer(manufacturer: CarManufacturer){
    this.selectedUpdateModel.manufacturerId = manufacturer.manufacturerId;
  }

  selectCategory(category: CarCategory){
    this.selectedUpdateModel.categoryId = category.categoryId;
  }

  selectModel(model: CarModel){
    this.selectedModel = model;
    this.selectedUpdateModel.carModel = model.carModel;
    this.selectedUpdateModel.year = model.year;
    this.selectedUpdateModel.categoryId = model.carCategory?.categoryId;
    this.selectedUpdateModel.manufacturerId = model.carManufacturer?.manufacturerId;
  }

  searchModel(){
    if (this.searchPhrase == "") {
      this.retrieveModel();
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

  editModel(){
    this.validate();
    if (!this.errorExist) {
      this.carModelService.update(this.selectedModel.modelId, this.selectedUpdateModel)
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (e) => {
            console.error(e)
            if (e.status == 200) {
            }
            else {
              this.errorMessage = e.error;
            }
          }
        });
    }
  }

  validate() {
    if (this.selectedModel.carModel == '') {
      this.errorMessage = "Enter a Car Model";
      this.errorExist = true;
    }
    else {
      this.errorMessage = "";
      this.errorExist = false;
    }
  }

  checkYear() {
    let year = this.selectedUpdateModel.year?.valueOf();
    if (!(new Number(this.selectedUpdateModel.year) <= this.defaultYear && new Number(this.selectedUpdateModel.year) > 1990)) {
      this.errorYear = "Select a valid year from 1990-" + this.defaultYear;
      this.errorMessage = "Select a valid year from 1990-" + this.defaultYear;
      this.errorExist = true;
    }
    else{
      this.errorYear = "";
      this.errorMessage = "";
      this.errorExist = false;
    }
  }


  deleteModel(){
    this.carModelService.delete(this.selectedModel.modelId)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => {
          console.error(e)
          if (e.status == 202) {
          }
          else {
            this.errorMessage = e.error;
          }
        }
      });
  }

}
