import { Component } from '@angular/core';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent {
  services: { name: string }[] = [];

  addService() {
    this.services.push({ name: '' });
  }

  deleteService(index: number) {
    this.services.splice(index, 1);
  }
}