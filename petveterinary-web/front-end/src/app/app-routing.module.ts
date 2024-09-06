import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/vistas/index/index.component'
import { LoginComponent } from './components/formularios/login/login.component';
import { SignupComponent } from './components/formularios/signup/signup.component';
import { NotFoundComponent } from './components/complementos/not-found/not-found.component';
import { DeniedComponent } from './components/complementos/denied/denied.component';
import { NosotrosComponent } from './components/vistas/nosotros/nosotros.component';
import { AvisoDePrivacidadComponent } from './components/complementos/aviso-de-privacidad/aviso-de-privacidad.component';
import { ReestablecerContComponent } from './components/formularios/reestablecer-cont/reestablecer-cont.component';
import { VerifyComponent } from './components/formularios/verify/verify.component';
import { VeterinarioComponent } from './components/formularios/veterinario/veterinario.component';
import { HistorialComponent } from './components/vistas/historial/historial.component';
import { ClienteSesionComponent } from './components/vistas/cliente-sesion/cliente-sesion.component';
import { VeterinarioSesionComponent } from './components/vistas/veterinario-sesion/veterinario-sesion.component';
import { authGuard } from './guards/auth.guard';
import { VeterinariosComponent } from './components/vistas/veterinarios/veterinarios.component';
import { MascotasComponent } from './components/formularios/mascotas/mascotas.component';
import { rolRoutingGuard } from './guards/rol-routing.guard';
import { PerfilMascotaComponent } from './components/vistas/perfil-mascota/perfil-mascota.component';
import { AgendarCitaComponent } from './components/formularios/agendarcita/agendarcita.component';
import { AtendercitaComponent } from './components/formularios/atendercita/atendercita.component';

const routes: Routes = [
  {path: 'Inicio', component: IndexComponent, canActivate:[rolRoutingGuard] ,data: {breadcrumb: 'Inicio'}},
  {path: 'Login', component: LoginComponent , data: {breadcrumb: 'Login'}},
  {path: 'Signup', component: SignupComponent, data: {breadcrumb: 'Singup'}},
  {path: 'Denegado', component: DeniedComponent, data: {breadcrumb: 'Inicio / Denegado'}},
  {path: 'Nosotros', component: NosotrosComponent, data: {breadcrumb: 'Inicio / Nosotros'}},
  {path: 'Policy',component: AvisoDePrivacidadComponent, data: {breadcrumb: 'Aviso de privacidad'}},
  {path: 'restablecer',component: ReestablecerContComponent, data: {breadcrumb: 'Login / Restablecer '}},
  {path: 'Verify',component: VerifyComponent, data: {breadcrumb: 'Login / Verify '}},
  {path: 'VeterinarioForm',component: VeterinarioComponent, canActivate: [authGuard], data: {allowedRoles: ['Admin']}},
  {path: 'Veterinarios', component: VeterinariosComponent, canActivate: [authGuard], data: {allowedRoles: ['Admin']}},
  {path: 'Historial',component: HistorialComponent, canActivate: [authGuard], data: {allowedRoles: ['Veterinario', 'Admin'], breadcrumb: 'Inicio / Historial '}},
  {path: 'ClienteSesion',component: ClienteSesionComponent, canActivate: [authGuard], data: {allowedRoles: ['Cliente'], breadcrumb: 'Inicio'}},
  {path: 'VeterinarioSesion',component: VeterinarioSesionComponent, canActivate: [authGuard], data: {allowedRoles: ['Veterinario','Admin'], breadcrumb: 'Inicio / Historial '}},
  {path: 'Mascotas', component:MascotasComponent, canActivate: [authGuard], data:{allowedRoles:['Cliente']}},
  {path: 'PerfilMascota/:id', component: PerfilMascotaComponent, canActivate:[authGuard], data:{allowedRoles:['Cliente','Admin','Veterinario']}},
  {path: 'AgendarCita/:idMascota', component: AgendarCitaComponent, canActivate:[authGuard], data:{allowedRoles:['Cliente','Admin','Veterinario']}},
  {path: 'AtenderCita/:idCita', component: AtendercitaComponent, canActivate:[authGuard], data:{allowedRoles:['Admin','Veterinario']}},
  {path: '**',component: NotFoundComponent, data: {breadcrumb: ''}}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

