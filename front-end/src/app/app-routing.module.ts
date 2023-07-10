import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RedirectComponent } from './redirect/redirect.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeComponent,
        pathMatch: 'full',
    },
    {
        path: 'r/:id',
        component: RedirectComponent,
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: 'redirect',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
