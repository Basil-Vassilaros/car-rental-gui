import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/entity/client.model';
import { ClientResponse } from 'src/app/models/response/client.response';
import { ClientService } from 'src/app/services/Client/client.service';

@Component({
  selector: 'app-clients.list',
  templateUrl: './clients.list.component.html',
  styleUrls: ['./clients.list.component.css']
})
export class ClientsListComponent implements OnInit {
  Title?: String = "Client"
  selectedClient: Client = new Client();
  newClient: Client = new Client();
  currentClient: Client = {};
  currentIndex = -1;
  search: String = "";
  clients?: Client[];

  message: String = "";

  constructor(
    private ClientService: ClientService,
    private router: Router
  ) { }

  // For when a feature is still unavailable
  inProgress(){
    console.log("work in progress");
  }

  // Get List of Cars from DB
  retrieveClient(): void {
    this.ClientService.getAll()
      .subscribe({
        next: (data) => {
          this.clients = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  // Load Initial Data
  ngOnInit(): void {
    this.retrieveClient();
  }

  // Refresh Page Data
  refreshList(): void {
    this.retrieveClient();
    this.currentClient = {};
    this.currentIndex = -1;
  }

  // When a Car is selected, save that Car in a variable
  selectClient(Client: Client) {
    this.selectedClient = Client;
  }

  // Reset newCar to prevent old data persistance
  resetNewClient(){
    this.newClient.emailAddress = "";
    this.newClient.firstName = "";
    this.newClient.lastName = "";
    this.newClient.homeAddress = "";
    this.newClient.mobileNumber = "";
  }

  // Add a new Car to DB
  addClient(){
    this.ClientService.create(this.newClient)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.retrieveClient();
      },
      error: (e) => console.error(e)
    });
  }

    updateClient() {
    this.ClientService.update(this.selectedClient.clientId, this.selectedClient).subscribe(
      data => {
        console.log(data);
        this.retrieveClient();
      },
      error => {
        console.log(error);
      }
    )
  }

    deleteClient() {
    this.ClientService.delete(this.selectedClient.clientId).subscribe(
      data => {
        console.log(data);
        this.retrieveClient();
      },
      error => {
        console.log(error);

      }
    )
  }

  // Search for Car
  findClient(): void {
    this.currentClient = {};
    this.currentIndex = -1;

    this.ClientService.search(this.search)
      .subscribe({
        next: (data) => {
          this.clients = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
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

  // Select current Car ????
  setActiveClient(Client: Client, index: number): void {
    this.currentClient = Client;
    this.currentIndex = index;
  }

  noClient: Client[] = []








  

  // goToDetails($myParam: number = -1): void {
  //   const navigationDetails: string[] = ['/Car-detail/'];
  //   if($myParam > 0) {
  //     var id = $myParam + "";
  //     navigationDetails.push(id);
  //   }
  //   this.router.navigate(navigationDetails);
  // }

  // getPublished() {
  //   if(this.publishedOnly){
  //     if(this.Cars?.length){
  //       return this.Cars.filter((Car) => Car.published == true);
  //     }
  //     else{
  //       this.message = "no Cars found";
  //       return this.noCar;
  //     }
  //   }
  //   else{
  //     return this.Cars
  //   }
    
  // }

  // updateCar() {
  //   this.CarService.update(this.selectedCar.ID, this.selectedCar).subscribe(
  //     data => {
  //       console.log(data);
  //       this.retrieveCars();
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  // }



  // removeAllCars(): void {
  //   this.CarService.deleteAll()
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.refreshList();
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }


  
  // deleteCar() {
  //   this.CarService.delete(this.selectedCar.ID).subscribe(
  //     data => {
  //       console.log(data);
  //       this.retrieveCars();
  //     },
  //     error => {
  //       console.log(error);

  //     }
  //   )
  // }
}
