import { CarCategory } from "./carCategory.model";
import { CarManufacturer } from "./carManufacturer.model";

export class CarModel {
    modelId?: number;
    carModel?: string;
    year?: string;
    carCategory?:CarCategory;
    carManufacturer?:CarManufacturer;
}