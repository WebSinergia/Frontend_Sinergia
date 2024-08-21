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
  qrImageUrl: string =
    'http://127.0.0.1:8000/conferencia/media/zone-images/zona2.jpeg';
  generatedQrUrl: string = '';
  user: any;
  selectedFileName: string | null = '';

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
    let storedData = localStorage.getItem('userData');
    if (storedData) {
      this.userData = JSON.parse(storedData);
      this.getImage(this.userData.us_zone);
    } else {
      console.warn('No hay datos en el local storage');
    }
  }

  getNewUserData(): void {
    this.inscripcionesService
      .getUserByDni(this.userData.us_dni)
      .subscribe((response) => {
        console.log('Backend Response 200', response);
        this.user = response;
        this.generatedQrUrl = this.getQrCodeUrl(this.user.us_qrcode);
      });
  }

  saveImage() {
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
      this.selectedFileName = file.name;
      console.log('Selected file', this.selectedFileName);
    }
  }

  downloadQR() {
    const link = document.createElement('a');
    link.href = this.generatedQrUrl;
    link.download = 'qr_code.png';
    link.click();
  }
}
