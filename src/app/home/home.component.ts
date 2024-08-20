import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InscripcionesService } from '../../services/inscripciones.service';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  generatedQrUrl: string = '';
  user: any;

  constructor(
    private router: Router,
    private inscripcionesService: InscripcionesService,
    private sharedDataService: SharedDataService
  ) {}

  getNewUserData(us_dni: string): void {
    this.inscripcionesService.getUserByDni(us_dni).subscribe((response) => {
      console.log('Backend Response 200', response);
      this.user = response;
      this.generatedQrUrl = this.getQrCodeUrl(this.user.us_qrcode);
    });
  }

  getQrCodeUrl(qrCodeUrl: string): string {
    console.log(qrCodeUrl.replace('/media/', '/conferencia/media/'));
    return qrCodeUrl.replace('/media/', '/conferencia/media/');
  }

  onSubmit(
    us_nombres: string,
    us_apellidos: string,
    us_dni: string,
    us_telefono: string,
    us_zone: string
  ): void {
    const userData = {
      us_nombres,
      us_apellidos,
      us_dni,
      us_telefono,
      us_zone,
    };

    /*---- REORDENAR FLUJO PARA EL QUE CUMPLA LOS 3 STEPS ----*/
    this.inscripcionesService.createUser(userData).subscribe(
      (response) => {
        console.log('Formulario enviado con éxito', response);
        this.getNewUserData(us_dni);
        this.sharedDataService.setUserData(userData);
        this.router.navigate(['/inscriptions']);
      },
      (error) => {
        console.error('Error al enviar el formulario', error);
      }
    );
  }
}
