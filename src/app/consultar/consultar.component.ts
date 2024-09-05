import { Component } from '@angular/core';
import { InscripcionesService } from '../../services/inscripciones.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrl: './consultar.component.css',
})
export class ConsultarComponent {
  dni: string = '';
  userData: any;
  qrCodeUrl: string = '';
  loading = false;

  constructor(
    private inscripcionesService: InscripcionesService,
    private router: Router
  ) {}

  search() {
    this.loading = true;
    if (this.dni) {
      this.inscripcionesService.getUserByDni(this.dni).subscribe(
        (response) => {
          console.log('Datos del usuario:', response);
          this.userData = response;
          this.qrCodeUrl = this.getQrCodeUrl(this.userData.us_qrcode);
          this.loading = false;
        },
        (error) => {
          console.error('Error al buscar usuario:', error);
          this.loading = false;
        }
      );
    } else {
      console.log('Datos del usuario');
      this.loading = false;
    }
  }

  regresar() {
    this.router.navigate([`/home`]);
  }

  marcarAsistencia(){
    
  }

  getQrCodeUrl(qrCodeUrl: string): string {
    console.log(qrCodeUrl.replace('/media/', '/conferencia/media/'));
    return qrCodeUrl.replace('/media/', '/conferencia/media/');
  }
}
