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
