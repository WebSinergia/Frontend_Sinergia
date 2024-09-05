import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

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
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ConsultarComponent } from './consultar.component';

const searchRoutes: Route[] = [
  {
    path: '',
    component: ConsultarComponent,
  },
];

@NgModule({
  declarations: [ConsultarComponent],
  imports: [
    RouterModule.forChild(searchRoutes),
    RouterModule,
    HttpClientModule,
    MatDialogModule,
    MatCardContent,
    MatGridTile,
    MatGridList,
    MatChipsModule,
    MatCard,
    CommonModule,
    MatCardHeader,
    MatCardTitle,
    MatCardModule,
    MatSlideToggleModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
})
export class ConsultarModule {}
