import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServicesPageComponent } from './pages/servicesPage/servicesPage.component';

export const routes: Routes = [
    {
        path:'',component:HomeComponent
    }
    ,
    {
        path:'services',component:ServicesPageComponent
    }
];
