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
  asistenciaMarcada = false;
  loading: boolean = false;

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

  marcarAsistencia(){
    this.loading = true;
    this.inscripcionesService.checkAsistenceDay1(this.userId).subscribe(
      (data) => {
        console.log('Asistencia marcada con exito');
        this.loading = false;
        this.asistenciaMarcada = true;
        setTimeout(() => {
          window.location.href = '/home';
        }, 3000);
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
        this.loading = false;
      }
    )
  }

  getUserData() {
    this.loading = true;
    if (this.userId) {
      this.inscripcionesService.getUserByID(this.userId).subscribe(
        (data) => {
          this.userData = data;
          this.loading = false;
          console.log(this.userData);
        },
        (error) => {
          console.error('Error al obtener los datos del usuario:', error);
          this.loading = false;
        }
      );
    }
  }
}
