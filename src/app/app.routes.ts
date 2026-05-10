import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { AboutComponent } from './components/about/about';
import { Punto1Component } from './punto1/punto1';
import { InscripcionesComponent } from './pages/inscripciones-component/inscripciones-component';
import { Punto3 } from './punto3/punto3'; //agregado por ignacio apaza

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'punto1', component: Punto1Component },
  { path: 'inscripciones', component: InscripcionesComponent },
  { path:'punto3', component:Punto3 } //ruta agregada por ignacio apaza
  // Aquí otros pueden agregar más rutas, por ejemplo:
  // { path: 'contact', component: ContactComponent },
];
