import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoginComponent } from './components/formularios/login/login.component';
import { SignupComponent } from './components/formularios/signup/signup.component';
import { IndexComponent } from './components/vistas/index/index.component';
import { NavbarComponent } from './components/complementos/navbar/navbar.component';
import { FooterComponent } from './components/complementos/footer/footer.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { NotFoundComponent } from './components/complementos/not-found/not-found.component';
import { DeniedComponent } from './components/complementos/denied/denied.component';
import { SearchComponent } from './components/complementos/search/search.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NosotrosComponent } from './components/vistas/nosotros/nosotros.component';
import {MatIconModule} from '@angular/material/icon';
import { ReestablecerContComponent } from './components/formularios/reestablecer-cont/reestablecer-cont.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerifyComponent } from './components/formularios/verify/verify.component';
import { VeterinarioComponent } from './components/formularios/veterinario/veterinario.component';
import { VeterinariosComponent } from './components/vistas/veterinarios/veterinarios.component';
import { MascotasComponent } from './components/formularios/mascotas/mascotas.component';
import { ClienteSesionComponent } from './components/vistas/cliente-sesion/cliente-sesion.component';
import { PerfilMascotaComponent } from './components/vistas/perfil-mascota/perfil-mascota.component';
import { VeterinarioSesionComponent } from './components/vistas/veterinario-sesion/veterinario-sesion.component';
import { AgendarCitaComponent } from './components/formularios/agendarcita/agendarcita.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    IndexComponent,
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
    DeniedComponent,
    SearchComponent,
    NosotrosComponent,
    ReestablecerContComponent,
    VerifyComponent,
    VeterinarioComponent,
    VeterinariosComponent,
    MascotasComponent,
    ClienteSesionComponent,
    PerfilMascotaComponent,
    VeterinarioSesionComponent,
    AgendarCitaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SweetAlert2Module,
    BreadcrumbModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
