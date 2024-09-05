import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InscripcionesService } from '../../services/inscripciones.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrl: './asistencia.component.css',
})
export class AsistenciaComponent {
  userId: number = 0;
  userData: any = {};

  constructor(
    private route: ActivatedRoute,
    private inscripcionesService: InscripcionesService
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.queryParamMap.get('id');
    if (idParam) {
      this.userId = +idParam;
      this.getUserData();
    }
  }

  getUserData() {
    if (this.userId) {
      this.inscripcionesService.getUserByID(this.userId).subscribe(
        (data) => {
          this.userData = data;
          console.log(this.userData);
        },
        (error) => {
          console.error('Error al obtener los datos del usuario:', error);
        }
      );
    }
  }
}
