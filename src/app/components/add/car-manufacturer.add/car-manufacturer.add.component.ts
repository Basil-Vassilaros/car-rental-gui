import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarManufacturer } from 'src/app/models/entity/carManufacturer.model';
import { CarManufacturerService } from 'src/app/services/Car-Manufacturer/car-manufacturer.service';

@Component({
  selector: 'app-car-manufacturer.add',
  templateUrl: './car-manufacturer.add.component.html',
  styleUrls: ['./car-manufacturer.add.component.css']
})
export class CarManufacturerAddComponent implements OnInit {
  manufacturer: CarManufacturer = new CarManufacturer();
  manufacturers?: CarManufacturer[];
  selectedMan: CarManufacturer = new CarManufacturer();
  errorExist = false;

  submitted = false;
  
  entity = "Manufacturer";
  errorMessage = "";

  constructor(
    private carManufacturerService: CarManufacturerService,
    private router: Router
  ) { }

  selectManufacturer(manufacturer: CarManufacturer){
    this.selectedMan = manufacturer;
  }

  ngOnInit(): void {
    this.retrieveManufacturers();
    this.new();
  }

  validate(){
    if(this.manufacturer.manufacturer == ''){
      this.errorMessage = "Enter a manufacturer name";
      this.errorExist = true;
    }
    else{
      this.errorMessage = "";
      this.errorExist = false;
    }
  }

  validateEdit(){
    if(this.selectedMan.manufacturer == ''){
      this.errorMessage = "Enter a manufacturer name";
      this.errorExist = true;
    }
    else{
      this.errorMessage = "";
      this.errorExist = false;
    }
  }

  save(): void {
    this.validate();
    if(!this.errorExist){
      this.carManufacturerService.create(this.manufacturer)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => {
          console.error(e)
          if (e.status == 202) {
            this.submitted = true;
          }
          else{
            this.errorMessage = e.error;
          }
        }
      });
    }
  }

  update(): void {
    this.validateEdit();
    if(!this.errorExist){
      this.carManufacturerService.update(this.selectedMan.manufacturerId, this.selectedMan)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => {
          console.error(e)
          if (e.status == 200) {
            this.submitted = true;
          }
          else{
            this.errorMessage = e.error;
          }
        }
      });
    }
  }

  deleteMan(){
    this.carManufacturerService.delete(this.selectedMan.manufacturerId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => {
          console.error(e)
          if (e.status == 202) {
            this.submitted = true;
          }
          else{
            this.errorMessage = e.error;
          }
        }
      });
  }

  new(): void {
    this.submitted = false;
    this.manufacturer = {
      manufacturer: ''
    };
  }

  retrieveManufacturers() {
    this.carManufacturerService.getAll().subscribe({
      next: (data) => {
        this.manufacturers = data;
      },
      error: (e) => console.error(e.error)
    })
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
