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

  constructor(
    private inscripcionesService: InscripcionesService,
    private router: Router
  ) {}

  search() {
    if (this.dni) {
      this.inscripcionesService.getUserByDni(this.dni).subscribe(
        (response) => {
          console.log('Datos del usuario:', response);
          this.userData = response;
          this.qrCodeUrl = this.getQrCodeUrl(this.userData.us_qrcode);
        },
        (error) => {
          console.error('Error al buscar usuario:', error);
        }
      );
    } else {
      console.log('Datos del usuario');
    }
  }

  regresar() {
    this.router.navigate([`/consultar`]);
  }

  getQrCodeUrl(qrCodeUrl: string): string {
    console.log(qrCodeUrl.replace('/media/', '/conferencia/media/'));
    return qrCodeUrl.replace('/media/', '/conferencia/media/');
  }
}
