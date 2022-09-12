import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/entity/car.model';
import { Client } from 'src/app/models/entity/client.model';
import { RentalRecord } from 'src/app/models/entity/rentalRecord.model';
import { RecordResponse } from 'src/app/models/response/record.response';
import { CarService } from 'src/app/services/Car/car.service';
import { ClientService } from 'src/app/services/Client/client.service';
import { RecordService } from 'src/app/services/Record/record.service';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-records.list',
  templateUrl: './records.list.component.html',
  styleUrls: ['./records.list.component.css']
})
export class RecordsListComponent implements OnInit {

  Title?: String = "Record"
  selectedRecord: RentalRecord = new RentalRecord();
  newRecord: RecordResponse = new RecordResponse();
  currentRecord: RentalRecord = {};
  currentIndex = -1;
  search: String = "";
  updatedRecord: RecordResponse = new RecordResponse();

  totalPrice?: number;
  d1?: string;
  d2: string = "";
  records?: RentalRecord[];
  clients?: Client[];
  cars?: Car[];

  showSuccessMessage: boolean = false;
  editMode: boolean = false;

  methodRequest: String = "";

  message: String = "";

  constructor(
    private RecordService: RecordService,
    private CarService: CarService,
    private ClientService: ClientService,
    private router: Router
  ) { }

  // For when a feature is still unavailable
  inProgress() {
    console.log("work in progress");
  }

  // Get List of Clients
  retrieveClients() {
    this.ClientService.getAll()
      .subscribe({
        next: (data) => {
          this.clients = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  toggleEditMode() {
    if (this.editMode) {
      this.editMode = false;
    }
    else {
      this.editMode = true;
    }
  }

  // Get List of Cars from DB
  retrieveCars(): void {
    this.CarService.getAll()
      .subscribe({
        next: (data) => {
          this.cars = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  // Get List of Records from DB
  retrieveRecords(): void {
    this.RecordService.getAll()
      .subscribe({
        next: (data) => {
          this.records = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  goTo(target: string): void {
    const navigationDetails: string[] = [target];
    this.router.navigate(navigationDetails);
  }

  // Calculate difference in Days
  calcTPrice() {
    let returnDString = this.updatedRecord.dateToReturn?.substring(0, 4) + "/" +
      this.updatedRecord.dateToReturn?.substring(5, 7) + "/" +
      this.updatedRecord.dateToReturn?.substring(8);

    let collectDString = this.updatedRecord.dateToCollect?.substring(0, 4) + "/" +
      this.updatedRecord.dateToCollect?.substring(5, 7) + "/" +
      this.updatedRecord.dateToCollect?.substring(8);

    let collectDate = new Date(collectDString);
    let returnDate = new Date(returnDString);

    let differenceInDays = (returnDate.valueOf() - collectDate.valueOf()) / (1000 * 60 * 60 * 24) + 1;

    if (this.selectedRecord.car?.price == undefined) {
      this.totalPrice = 0;
    }
    else {
      this.totalPrice = this.selectedRecord.car.price * differenceInDays;
    }
  }

  // Load Initial Data
  ngOnInit(): void {
    this.retrieveCars();
    this.retrieveClients();
    this.retrieveRecords();
  }

  // Refresh Page Data
  refreshList(): void {
    this.retrieveCars();
    this.retrieveClients();
    this.retrieveRecords();
    this.currentRecord = {};
    this.currentIndex = -1;
  }

  selectNewCar(Car: Car) {
    this.newRecord.carId = Car.carId;
    this.updatedRecord.carId = Car.carId;
  }

  selectNewClient(Client: Client) {
    this.newRecord.clientId = Client.clientId;
    this.updatedRecord.clientId = Client.clientId;
  }

  // Set Updated Record
  selectUpdateRecord(Record: RentalRecord) {
    this.updatedRecord.recordId = Record.rentalId;
    this.updatedRecord.carId = Record.car?.carId;
    this.updatedRecord.clientId = Record.client?.clientId;
    this.updatedRecord.dateToCollect = Record.dateToCollect;
    this.updatedRecord.dateToReturn = Record.dateToReturn;
  }

  // Set Updated Record
  selectRecord(Record: RentalRecord) {
    this.selectedRecord.rentalId = Record.rentalId;
    this.selectedRecord.car = Record.car;
    this.selectedRecord.client = Record.client;
    this.selectedRecord.dateReservationMade = Record.dateReservationMade;
    this.selectedRecord.dateToCollect = Record.dateToCollect;
    this.selectedRecord.dateToReturn = Record.dateToReturn;
    this.selectedRecord.totalPrice = Record.totalPrice;
    this.totalPrice = Record.totalPrice;
  }

  // Reset newCar to prevent old data persistance
  resetNewRecord() {
    this.newRecord.carId = -1;
    this.newRecord.clientId = -1;
    this.newRecord.dateToCollect = "";
    this.newRecord.dateToReturn = "";
  }

  // Fix the format of the dates
  fixDate() {
    this.updatedRecord.dateToReturn = this.updatedRecord.dateToReturn?.substring(8) + "/" +
      this.updatedRecord.dateToReturn?.substring(5, 7) + "/" +
      this.updatedRecord.dateToReturn?.substring(0, 4);
    this.updatedRecord.dateToCollect = this.updatedRecord.dateToCollect?.substring(8) + "/" +
      this.updatedRecord.dateToCollect?.substring(5, 7) + "/" +
      this.updatedRecord.dateToCollect?.substring(0, 4);

    this.newRecord.dateToReturn = this.newRecord.dateToReturn?.substring(8) + "/" +
      this.newRecord.dateToReturn?.substring(5, 7) + "/" +
      this.newRecord.dateToReturn?.substring(0, 4);
    this.newRecord.dateToCollect = this.newRecord.dateToCollect?.substring(8) + "/" +
      this.newRecord.dateToCollect?.substring(5, 7) + "/" +
      this.newRecord.dateToCollect?.substring(0, 4);
  }

  // Add a new Record to DB
  addNewRecord() {
    this.fixDate();
    this.RecordService.create(this.newRecord)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.retrieveRecords();
          this.showSuccessMessage = true;
          this.methodRequest = "was saved";
        },

        error: (e) => {
          console.log(e.error);
          this.showSuccessMessage = false;
          this.message = e.error;
        }
      });
  }


  // Update a current Record
  updateRecord() {
    this.fixDate();
    this.RecordService.update(this.updatedRecord.recordId, this.updatedRecord)
      .subscribe({
        next: (message) => {
          console.log(message);
          this.retrieveRecords();
        },
        error: (e) => {
          if (e.status == 202) {
            this.showSuccessMessage = true;
            this.methodRequest = "was updated";
            console.log("success");
            this.retrieveRecords();
          }
          else {
            console.log(e);
            this.showSuccessMessage = false;
          }

        }
      });
  }

  // Select current Record
  setActiveRecord(Record: RentalRecord, index: number): void {
    this.currentRecord = Record;
    this.currentIndex = index;
  }

  // Search for Record
  findRecord(): void {
    this.currentRecord = {};
    this.currentIndex = -1;
    if(this.search = ""){
      this.retrieveRecords();
    }else{
      this.RecordService.search(this.search)
      .subscribe({
        next: (data) => {
          this.records = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
    }
  }

  // Search for Car
  findCar(): void {
    this.CarService.search(this.search)
      .subscribe({
        next: (data) => {
          this.cars = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}