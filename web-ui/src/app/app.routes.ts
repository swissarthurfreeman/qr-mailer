import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'new-ticket/:t',
        loadComponent: () => import('./new-ticket-form/new-ticket-form-container.component').then(m => m.NewTicketFormContainerComponent)
    },
    {
        path: '',
        loadComponent: () => import('./home/home-container.component').then(m => m.HomeContainerComponent)
    }
];
