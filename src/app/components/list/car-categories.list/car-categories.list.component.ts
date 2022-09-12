import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarCategory } from 'src/app/models/entity/carCategory.model';
import { CarCategoryService } from 'src/app/services/Car-Category/car-category.service';

@Component({
  selector: 'app-car-categories.list',
  templateUrl: './car-categories.list.component.html',
  styleUrls: ['./car-categories.list.component.css']
})
export class CarCategoriesListComponent implements OnInit {
  entity = "Categor"
  categories?: CarCategory[];
  selectedCategory: CarCategory = new CarCategory();
  searchPhrase = "";
  errorExist = false;
  errorMessage = "";

  constructor(
    private carCategoryService: CarCategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.retrieveCategories();
  }

  goTo(target: string): void {
    const navigationDetails: string[] = [target];
    this.router.navigate(navigationDetails);
  }

  retrieveCategories(){
    this.carCategoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (e) => console.error(e.error)
    })
  }

  selectCategory(category: CarCategory){
    this.selectedCategory = category;
  }

  searchCategory(){
    if (this.searchPhrase == "") {
      this.retrieveCategories();
    }
    else {
      this.carCategoryService.search(this.searchPhrase)
        .subscribe({
          next: (data) => {
            this.categories = data;
            console.log(data);
          },
          error: (e) => console.error(e)
        });
    }
  }

  editCategory(){
    this.validate();
    if (!this.errorExist) {
      this.carCategoryService.update(this.selectedCategory.categoryId, this.selectedCategory)
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
    if (this.selectedCategory.carCategory == '') {
      this.errorMessage = "Enter a Vehicle Category (Truck, Lorry, Bus, Combi, Car, etc.)";
      this.errorExist = true;
    }
    else {
      this.errorMessage = "";
      this.errorExist = false;
    }
  }

  deleteCategory(){
    this.carCategoryService.delete(this.selectedCategory.categoryId)
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
