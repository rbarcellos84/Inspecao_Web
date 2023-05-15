import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { BrowserAnimationsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router'; //importando rotas
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; //controle dos objetos da tela
import { HttpClientModule} from '@angular/common/http'; //comunicação com API

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginCadastroComponent } from './pages/login-cadastro/login-cadastro.component';
import { InspecaoCadastroComponent } from './pages/inspecao-cadastro/inspecao-cadastro.component';
import { InspecaoConsultaComponent } from './pages/inspecao-consulta/inspecao-consulta.component';
import { MenuComponent } from './pages/menu/menu.component';

//construcao de rota
const routes: Routes = [
  {path : '', pathMatch: 'full', redirectTo: 'login'}, //definicao de pagina inicial
  {path : 'login', component: LoginComponent},
  {path : 'home', component: HomeComponent},
  {path : 'loginCadastro', component: LoginCadastroComponent},
  {path : 'inspecaoCadastro', component: InspecaoCadastroComponent},
  {path : 'inspecaoConsulta', component: InspecaoConsultaComponent},
  {path : 'menu', component: MenuComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LoginCadastroComponent,
    InspecaoConsultaComponent,
    InspecaoCadastroComponent,
    HomeComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, //formularios reativados
    ReactiveFormsModule, //formularios reativados
    RouterModule.forRoot(routes), //registrando rotas
    HttpClientModule //registrando a biblioteca de requisições de API
  ],
  providers: [],
  bootstrap: [AppComponent] //habilitando o bootstrap
})
export class AppModule { }
