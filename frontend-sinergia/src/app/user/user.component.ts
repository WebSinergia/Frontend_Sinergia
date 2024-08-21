import { Component } from '@angular/core';
import { InscripcionesService } from '../../services/inscripciones.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent {
  userData: any[] = [];
  filteredUserData: any[] = [];
  zones: number[] = [];
  selectedCategory: string | null = 'All';

  constructor(public inscripcionesService: InscripcionesService) {}

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.inscripcionesService.getUserList().subscribe(
      (response) => {
        console.log('Respuesta Exitosa', response);
        this.userData = response;
        this.filteredUserData = response;
        this.extractZones();
      },
      (error) => {
        console.error('Error al enviar el formulario', error);
      }
    );
  }

  extractZones() {
    this.zones = [...new Set(this.userData.map(user => user.us_zone))];
  }

  filterByZone(zone: string | null) {
    if (zone) {
      this.filteredUserData = this.userData.filter(user => user.us_zone == zone);
    } else {
      this.filteredUserData = this.userData;
    }
  }
}

