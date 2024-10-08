import { ConsultarModule } from './consultar/consultar.module';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'inscriptions',
    loadChildren: () =>
      import('./inscripciones/inscripciones.module').then(
        (m) => m.InscripcionesModule
      ),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./search/search.module').then((m) => m.SearchModule),
  },
  {
    path: 'user-list',
    loadChildren: () =>
      import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'asistencia',
    loadChildren: () =>
      import('./asistencia/asistencia.module').then((m) => m.AsistenciaModule),
  },
  {
    path: 'consultar',
    loadChildren: () =>
      import('./consultar/consultar.module').then((m) => m.ConsultarModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'graphics',
    loadChildren: () =>
      import('./graphics/graphics.module').then((m) => m.GraphicsModules),
  }
];
