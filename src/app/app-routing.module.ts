import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioLoginComponent } from './formulario-login/formulario-login.component';
const routes: Routes = [

  { path: '', redirectTo: '/register', pathMatch: 'full' },

  {path: '',
  children: [
    {
      path: 'register',

      children: [
        {
          path: '',
          component: FormularioLoginComponent
        }
      ]
    },

  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
