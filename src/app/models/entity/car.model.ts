import { CarModel } from "./carModel.model";

export class Car {
    carId?: number;
    registrationNumber?: string;
    color?: string;
    price?: number;
    isReserved?: boolean;
    inUse?: boolean;
    reservedDates?: String[];

    carModel?:CarModel;

}