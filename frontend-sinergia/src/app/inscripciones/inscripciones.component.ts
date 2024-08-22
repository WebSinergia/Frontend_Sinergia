import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InscripcionesService } from '../../services/inscripciones.service';
import { Router } from '@angular/router';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.css',
})
export class InscripcionesComponent {
  imageForm: FormGroup;
  zonas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  qrImageUrl: string = '';
  generatedQrUrl: string = '';
  user: any;
  selectedFileName: string | null = '';
  selectedFile: File | null = null;

  userData: any;
  imageData: any;

  constructor(
    private inscripcionesService: InscripcionesService,
    private fb: FormBuilder,
  ) {
    this.imageForm = this.fb.group({
      image: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    let storedData = localStorage.getItem('userData');
    if (storedData) {
      this.userData = JSON.parse(storedData);
      this.getImage(this.userData.us_zone);
    } else {
      console.warn('No hay datos en el local storage');
    }
  }

  saveImage() {
    const formData = new FormData();

    for (const key in this.userData) {
      if (this.userData.hasOwnProperty(key)) {
        formData.append(key, this.userData[key]);
      }
    }
  
    if (this.selectedFile) {
      formData.append('us_imagen_pago', this.selectedFile);
    }

    console.log(formData);

    this.inscripcionesService.createUser(formData).subscribe(
      (response) => {
        console.log('Formulario enviado con éxito', response);
      },
      (error) => {
        console.error('Error al enviar el formulario', error);
      }
    );
    this.getNewUserData();
  }

  getNewUserData(): void {
    this.inscripcionesService
      .getUserByDni(this.userData.us_dni)
      .subscribe((response) => {
        console.log('Backend Response 200', response);
        this.user = response;
        this.generatedQrUrl = this.getQrCodeUrl(this.user.us_qrcode);
      });
    localStorage.clear();
  }

  getQrCodeUrl(qrCodeUrl: string): string {
    console.log(qrCodeUrl.replace('/media/', '/conferencia/media/'));
    return qrCodeUrl.replace('/media/', '/conferencia/media/');
  }

  getImage(selectedZone: string) {
    const zoneNumber = +selectedZone;
    this.inscripcionesService.getImageByZone(zoneNumber).subscribe(
      (response: any) => {
        this.qrImageUrl = this.getQrCodeUrl(response.image_url);
        this.imageData = response;
      },
      (error) => {
        console.error('Error al obtener la imagen', error);
      }
    );
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;
    }
  }

  downloadQR() {
    const link = document.createElement('a');
    link.href = this.generatedQrUrl;
    link.download = 'qr_code.png';
    link.click();
  }
}
