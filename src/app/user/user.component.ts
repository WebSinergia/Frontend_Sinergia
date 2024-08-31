import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { InscripcionesService } from '../../services/inscripciones.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  userData: any[] = [];
  filteredUserData: any[] = [];
  zones: number[] = [];
  selectedCategory: string | null = 'All';
  isModalOpen = false;
  userId = '';
  filteredZone: string | null = '';
  loading = false;

  constructor(public router: Router, public inscripcionesService: InscripcionesService) {}

  ngOnInit() {
    this.getUserList();
  }

  openModal(id:string) {
    this.isModalOpen = true;
    this.userId = id;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  confirmarPago(){
    this.loading = true;
    this.inscripcionesService.editUserById(this.userId).subscribe(
      (response) => {
        console.log('ID editado con exito', response);
        this.selectedCategory = '';
        this.getUserList();
        this.filterByZone(this.filteredZone);
        this.closeModal();
        this.loading = false;
      },
      (error) => {
        console.error('Error al enviar el formulario', error);
        this.loading = false;
      }
    );
    
    this.router.navigate(['/user-list']);
  }

  getUserList() {
    this.loading = true;
    this.inscripcionesService.getUserList().subscribe(
      (response) => {
        console.log('Respuesta Exitosa', response);
        this.userData = response;
        this.filteredUserData = response;
        this.extractZones();
        this.loading = false;
      },
      (error) => {
        console.error('Error al enviar el formulario', error);
        this.loading = false;
      }
    );
  }

  extractZones() {
    this.zones = [...new Set(this.userData.map((user) => user.us_zone))];
  }

  filterByZone(zone: string | null) {
    this.filteredZone = zone;
    if (zone) {
      this.filteredUserData = this.userData.filter(
        (user) => user.us_zone == zone
      );
    } else {
      this.filteredUserData = this.userData;
    }
  }
}
