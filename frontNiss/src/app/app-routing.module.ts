import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ConsultarRolComponent } from './pages/rol/consultar-rol/consultar-rol.component';
import { EliminarRolComponent } from './pages/rol/eliminar-rol/eliminar-rol.component';
import { GuardarRolComponent } from './pages/rol/guardar-rol/guardar-rol.component';
import { ModificarRolComponent } from './pages/rol/modificar-rol/modificar-rol.component';
import { ConsultarUserComponent } from './pages/user/consultar-user/consultar-user.component';
import { EliminarUserComponent } from './pages/user/eliminar-user/eliminar-user.component';
import { GuardarUserComponent } from './pages/user/guardar-user/guardar-user.component';
import { ModificarUserComponent } from './pages/user/modificar-user/modificar-user.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch: 'full'},
  {path: 'capturaRol', component: GuardarRolComponent},
  {path: 'modificaRol', component: ModificarRolComponent},
  {path: 'consultaRol', component: ConsultarRolComponent},
  {path: 'eliminaRol', component: EliminarRolComponent},
  {path: 'capturaUser', component: GuardarUserComponent},
  {path: 'modificaUser', component:ModificarUserComponent},
  {path: 'consultaUser', component: ConsultarUserComponent},
  {path: 'eliminaUser', component:EliminarUserComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
