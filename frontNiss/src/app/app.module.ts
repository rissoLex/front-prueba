import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { AlertModule } from '@coreui/angular';
import { LoginComponent } from './pages/login/login.component';
import { GuardarRolComponent } from './pages/rol/guardar-rol/guardar-rol.component';
import { GuardarUserComponent } from './pages/user/guardar-user/guardar-user.component';
import { ConsultarUserComponent } from './pages/user/consultar-user/consultar-user.component';
import { ConsultarRolComponent } from './pages/rol/consultar-rol/consultar-rol.component';
import { MenuComponent } from './menu/menu.component';
import { ModificarRolComponent } from './pages/rol/modificar-rol/modificar-rol.component';
import { EliminarRolComponent } from './pages/rol/eliminar-rol/eliminar-rol.component';
import { ModificarUserComponent } from './pages/user/modificar-user/modificar-user.component';
import { EliminarUserComponent } from './pages/user/eliminar-user/eliminar-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    GuardarRolComponent,
    GuardarUserComponent,
    ConsultarUserComponent,
    ConsultarRolComponent,
    MenuComponent,
    ModificarRolComponent,
    EliminarRolComponent,
    ModificarUserComponent,
    EliminarUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NgbModule,
    IconModule,
    AlertModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    IconSetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
