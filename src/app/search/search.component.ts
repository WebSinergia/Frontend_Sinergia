import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InscripcionesService } from '../../services/inscripciones.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  form: FormGroup;
  user: any;

  constructor(
    private inscripcionesService: InscripcionesService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      us_dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) {
      this.inscripcionesService.getUserByDni(this.form.get('us_dni')?.value).subscribe(
        (response) => {
          console.log('Backend Response 200', response);
          this.user = response
        },
        (error) => {
          console.error('Error al enviar el formulario', error);
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }

  getQrCodeUrl(qrCodeUrl: string): string {
    return qrCodeUrl.replace('/media/', '/conferencia/media/');
  }
  
}
