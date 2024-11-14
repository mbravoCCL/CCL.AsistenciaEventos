import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path : 'detalle/:id',
        loadComponent: () => import('./pages/asistencia/asistencia.component'),    
    },
    {
        path: '',
        redirectTo : 'detalle/0',
        pathMatch: 'full'
    }
];
