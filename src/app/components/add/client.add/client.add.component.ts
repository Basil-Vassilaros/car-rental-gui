import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/Client/client.service';

@Component({
  selector: 'app-client.add',
  templateUrl: './client.add.component.html',
  styleUrls: ['./client.add.component.css']
})
export class ClientAddComponent implements OnInit {

  constructor(
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
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
