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
  qrImageUrl: string = 'http://127.0.0.1:8000/conferencia/media/zone-images/zona2.jpeg';
  generatedQrUrl: string = '';
  user: any;

  userData: any;
  imageData: any;

  constructor(
    private router: Router,
    private inscripcionesService: InscripcionesService,
    private fb: FormBuilder,
    private sharedDataService: SharedDataService
  ) {
    this.imageForm = this.fb.group({
      image: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.sharedDataService.userData$.subscribe(data => {
      this.userData = data;
    });

    this.getImage(this.userData.us_zone)
  }

  getNewUserData(): void {
    this.inscripcionesService.getUserByDni(this.userData.us_dni).subscribe(
      (response) => {
        console.log('Backend Response 200', response);
        this.user = response
        this.generatedQrUrl = this.getQrCodeUrl(this.user.us_qrcode);
      }
    )
  }

  saveImage(){
    this.getNewUserData();
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      //formData.append('zone', this.form.get('us_zone')?.value);

      // this.http.post('API_URL_TO_UPLOAD_IMAGE', formData).subscribe(response => {
      //   console.log('Imagen subida exitosamente', response);
      // });
    }
  }

  downloadQR() {
    // Lógica para descargar el QR
    const link = document.createElement('a');
    link.href = this.generatedQrUrl;
    link.download = 'qr_code.png';
    link.click();
  }
}
