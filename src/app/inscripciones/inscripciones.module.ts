import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { InscripcionesComponent } from './inscripciones.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridList } from '@angular/material/grid-list';
import { MatGridTile } from '@angular/material/grid-list';
import { MatCardContent } from '@angular/material/card';
import { MatCardHeader } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatCard } from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { storageDataGuard } from '../../guards/storage-data.guard';

const inscriptionsRoutes: Route[] = [
  {
    path: '',
    canActivate: [storageDataGuard],
    component: InscripcionesComponent,
    children: [
      { path: '', redirectTo: 'step2', pathMatch: 'full' },
      { path: 'step2', component: InscripcionesComponent },
      { path: 'step3', component: InscripcionesComponent },
    ],
  },
];

@NgModule({
  declarations: [InscripcionesComponent],
  imports: [
    RouterModule.forChild(inscriptionsRoutes),
    RouterModule,
    HttpClientModule,
    CommonModule,
    MatDialogModule,
    MatCardContent,
    MatGridTile,
    MatGridList,
    MatChipsModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class InscripcionesModule {}
