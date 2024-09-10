import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";

import { GraphicsComponent } from './graphics.component';

import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridList } from '@angular/material/grid-list';
import { MatGridTile } from '@angular/material/grid-list';
import { MatCardContent } from '@angular/material/card';
import { MatCardHeader } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatCard } from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { BaseChartDirective } from 'ng2-charts';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

const graficosRoutes: Route[] = [
    {
      path: '',
      component: GraphicsComponent
    }
  ];

@NgModule({
  declarations: [
    GraphicsComponent,
  ],
  exports: [
    GraphicsComponent
  ],
  imports: [
    RouterModule.forChild(graficosRoutes),
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
    BaseChartDirective,
  ],
  providers: [
    provideCharts(withDefaultRegisterables())
  ],
})
export class GraphicsModules { }