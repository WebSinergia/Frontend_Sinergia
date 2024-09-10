import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from './app.routes';
import { Route, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule.forRoot(routes),
    RouterModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatDialogModule,
    MatChipsModule,
    RouterModule,
    HttpClientModule,
    CommonModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    provideCharts(withDefaultRegisterables())
  ],
})

export class AppModule {}
