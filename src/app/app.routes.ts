import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { AboutComponent } from './components/about/about';
import { Punto1Component } from './punto1/punto1';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'punto1', component: Punto1Component },
  // Aquí otros pueden agregar más rutas, por ejemplo:
  // { path: 'contact', component: ContactComponent },
];
