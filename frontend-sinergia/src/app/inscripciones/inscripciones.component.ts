import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InscripcionesService } from '../../services/inscripciones.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  user: any = { us_nombres: "", us_apellidos: "", us_zone: "", us_dni: ""};
  selectedFileName: string | null = '';
  selectedFile: File | null = null;

  userData: any;
  imageData: any = { name: "", celular: "", modalidad: "" };
  
  currentStep: string = '';

  constructor(
    private inscripcionesService: InscripcionesService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.imageForm = this.fb.group({
      image: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.getData();
    this.route.firstChild?.url.subscribe(urlSegment => {
      if (urlSegment.length) {
        this.currentStep = urlSegment[0].path;
        console.log("Current Step:",this.currentStep);
        this.handleStep(this.currentStep);
      }
    });
  }

  handleStep(step: string) {
    switch (step) {
      case 'step2':
        this.loadStep2();
        this.currentStep = 'step2';
        break;
      case 'step3':
        this.loadStep3();
        this.currentStep = 'step3';
        break;
      default:
        this.loadStep2();
        this.currentStep = '2';
        break;
    }
  }

  loadStep2() {
    console.log('Cargando paso 2');
  }

  loadStep3() {
    console.log('Cargando paso 3');
  }

  navigateToStep(step: string) {
    this.router.navigate([`/inscriptions/${step}`]);
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

    this.inscripcionesService.createUser(formData).subscribe(
      (response) => {
        console.log('Formulario enviado con éxito', response);
        this.getNewUserData();
        this.handleStep('step3');
        this.navigateToStep('step3');
      },
      (error) => {
        console.error('Error al enviar el formulario', error);
      }
    );
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

  getQrCodeUrl(qrCodeUrl: string): string {
    console.log(qrCodeUrl.replace('/media/', '/conferencia/media/'));
    return qrCodeUrl.replace('/media/', '/conferencia/media/');
  }

  getImage(selectedZone: string) {
    console.log('selectedZone');
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
