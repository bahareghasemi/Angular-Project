import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ApiDataComponent } from './api-data/api-data.component';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from '../app/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'form',
    component: FormComponent
  },
  {
    path: 'api-data',
    component: ApiDataComponent, 
    canActivate: [authGuard] 
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  { path: 'home', redirectTo: 'home', pathMatch: 'full' },
  // Uncomment and add PageNotFoundComponent if you have it for handling undefined routes
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
