import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarCategory } from 'src/app/models/entity/carCategory.model';
import { CarCategoryService } from 'src/app/services/Car-Category/car-category.service';

@Component({
  selector: 'app-car-category.add',
  templateUrl: './car-category.add.component.html',
  styleUrls: ['./car-category.add.component.css']
})
export class CarCategoryAddComponent implements OnInit {
  submitted = false;
  entity = "Category"
  errorMessage = "";
  errorExist = false;
  category: CarCategory = new CarCategory();



  constructor(
    private carCategoryService: CarCategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goTo(target: string): void {
    const navigationDetails: string[] = [target];
    this.router.navigate(navigationDetails);
  }

  validate(){
    if(this.category.carCategory == ""){
      this.errorMessage = "Enter a Vehicle Category (Truck, Lorry, Bus, Combi, Car, etc.)";
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
      this.carCategoryService.create(this.category)
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

}
