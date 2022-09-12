import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CarDetailsComponent } from './components/details/car.details/car.details.component';
import { CarModelDetailsComponent } from './components/details/car-model.details/car-model.details.component';
import { ClientDetailsComponent } from './components/details/client.details/client.details.component';
import { RecordDetailsComponent } from './components/details/record.details/record.details.component';
import { CarCategoryDetailsComponent } from './components/details/car-category.details/car-category.details.component';
import { CarManufacturerDetailsComponent } from './components/details/car-manufacturer.details/car-manufacturer.details.component';

import { ClientsListComponent } from './components/list/clients.list/clients.list.component';
import { CarModelsListComponent } from './components/list/car-models.list/car-models.list.component';
import { CarManufacturersListComponent } from './components/list/car-manufacturers.list/car-manufacturers.list.component';
import { CarCategoriesListComponent } from './components/list/car-categories.list/car-categories.list.component';
import { CarsListComponent } from './components/list/cars.list/cars.list.component';
import { RecordsListComponent } from './components/list/records.list/records.list.component';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from "@angular/material/select";
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarModelAddComponent } from './components/add/car-model.add/car-model.add.component';
import { CarAddComponent } from './components/add/car.add/car.add.component';
import { CarCategoryAddComponent } from './components/add/car-category.add/car-category.add.component';
import { CarManufacturerAddComponent } from './components/add/car-manufacturer.add/car-manufacturer.add.component';
import { ClientAddComponent } from './components/add/client.add/client.add.component';


@NgModule({
  declarations: [
    AppComponent,
    CarDetailsComponent,
    CarModelDetailsComponent,
    ClientDetailsComponent,
    RecordDetailsComponent,
    ClientsListComponent,
    CarModelsListComponent,
    CarManufacturersListComponent,
    CarCategoriesListComponent,
    CarsListComponent,
    RecordsListComponent,
    CarCategoryDetailsComponent,
    CarManufacturerDetailsComponent,
    CarModelAddComponent,
    CarAddComponent,
    CarCategoryAddComponent,
    CarManufacturerAddComponent,
    ClientAddComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    MatSelectModule,
    NgxMatSelectSearchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
