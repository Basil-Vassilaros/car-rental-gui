import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarCategoryDetailsComponent } from './components/details/car-category.details/car-category.details.component';
import { CarManufacturerDetailsComponent } from './components/details/car-manufacturer.details/car-manufacturer.details.component';
import { CarModelDetailsComponent } from './components/details/car-model.details/car-model.details.component';
import { CarDetailsComponent } from './components/details/car.details/car.details.component';
import { ClientDetailsComponent } from './components/details/client.details/client.details.component';
import { RecordDetailsComponent } from './components/details/record.details/record.details.component';
import { CarCategoriesListComponent } from './components/list/car-categories.list/car-categories.list.component';
import { CarManufacturersListComponent } from './components/list/car-manufacturers.list/car-manufacturers.list.component';
import { CarModelsListComponent } from './components/list/car-models.list/car-models.list.component';
import { CarsListComponent } from './components/list/cars.list/cars.list.component';
import { ClientsListComponent } from './components/list/clients.list/clients.list.component';
import { RecordsListComponent } from './components/list/records.list/records.list.component';
import { CarManufacturerAddComponent } from './components/add/car-manufacturer.add/car-manufacturer.add.component';
import { CarModelAddComponent } from './components/add/car-model.add/car-model.add.component';
import { CarCategoryAddComponent } from './components/add/car-category.add/car-category.add.component';
import { CarAddComponent } from './components/add/car.add/car.add.component';
import { ClientAddComponent } from './components/add/client.add/client.add.component';


const routes: Routes = [
{ path: 'car', component: CarsListComponent  },
{ path: 'car/add', component: CarAddComponent  },
{ path: 'car/details/:id', component: CarDetailsComponent }, 

{ path: 'category', component: CarCategoriesListComponent  },
{ path: 'category/add', component: CarCategoryAddComponent  },
{ path: 'category/details/:id', component: CarCategoryDetailsComponent }, 

{ path: 'manufacturer', component: CarManufacturersListComponent }, 
{ path: 'manufacturer/details/:id', component: CarManufacturerDetailsComponent }, 
{ path: 'manufacturer/add', component: CarManufacturerAddComponent }, 

{ path: 'model', component: CarModelsListComponent }, 
{ path: 'model/add', component: CarModelAddComponent }, 
{ path: 'model/details/:id', component: CarModelDetailsComponent }, 

{ path: 'client', component: ClientsListComponent }, 
{ path: 'client/add', component: ClientAddComponent }, 
{ path: 'client/details/:id', component: ClientDetailsComponent }, 

{ path: 'record', component: RecordsListComponent }, 
{ path: 'record/details/:id', component: RecordDetailsComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
