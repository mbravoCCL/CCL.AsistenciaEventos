import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path : 'detalle/:id',
        loadComponent: () => import('./pages/asistencia/asistencia.component'),    
    },
    {
        path: '',
        redirectTo : 'detalle/3D05941F-F448-ED11-84E9-00155D00F816',
        pathMatch: 'full'
    }
];


//HOY F2DC2946-C897-EF11-905E-00155D00F711

// http://localhost:4200/detalle/3D05941F-F448-ED11-84E9-00155D00F816 COMO SELECCIONAR

//http://localhost:4200/detalle/26F833A1-C49B-EF11-905E-00155D00F711