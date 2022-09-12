import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarManufacturer } from 'src/app/models/entity/carManufacturer.model';
import { CarManufacturerService } from 'src/app/services/Car-Manufacturer/car-manufacturer.service';

@Component({
  selector: 'app-car-manufacturers.list',
  templateUrl: './car-manufacturers.list.component.html',
  styleUrls: ['./car-manufacturers.list.component.css']
})
export class CarManufacturersListComponent implements OnInit {
  manufacturers?: CarManufacturer[];
  selectedMan: CarManufacturer = new CarManufacturer();
  newManufacturer: CarManufacturer = new CarManufacturer();
  entity = "Manufacturer"
  errorMessage = "";
  errorExist = false;
  currentManufacturer: CarManufacturer = new CarManufacturer();
  currentIndex = -1;
  phrase: String = "";

  constructor(
    private carManufacturerService: CarManufacturerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.retrieveManufacturers();
  }

  resetNewManufacturer() {
    this.newManufacturer.manufacturer = "";
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
    this.selectedMan = manufacturer;
  }


  validateEdit() {
    if (this.selectedMan.manufacturer == '') {
      this.errorMessage = "Enter a manufacturer name";
      this.errorExist = true;
    }
    else {
      this.errorMessage = "";
      this.errorExist = false;
    }
  }

  update(): void {
    this.validateEdit();
    if (!this.errorExist) {
      this.carManufacturerService.update(this.selectedMan.manufacturerId, this.selectedMan)
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

  deleteMan() {
    this.carManufacturerService.delete(this.selectedMan.manufacturerId)
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

  // Search for Car
  search(): void {
    this.currentManufacturer = {};
    this.currentIndex = -1;

    if (this.phrase == "") {
      this.retrieveManufacturers();
    }
    else {
      this.carManufacturerService.search(this.phrase)
        .subscribe({
          next: (data) => {
            this.manufacturers = data;
            console.log(data);
          },
          error: (e) => console.error(e)
        });
    }
  }

  goTo(target: string): void {
    const navigationDetails: string[] = [target];
    this.router.navigate(navigationDetails);
  }
}
