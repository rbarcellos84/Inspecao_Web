import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  meuLogin: string = "";

  constructor(private router: Router) {}

  //ao iniciar a tela
  ngOnInit(): void {
    //verifica autorização
    this.verificarLogin();
  }
  
  formMenu = new FormGroup({
    nomeLogin: new FormControl(this.onLoad())
  });

  onLoad(): string {
    //alert("Login: " + localStorage.getItem('login'));
    this.meuLogin = "Usuário: " + localStorage.getItem('login');
    return this.meuLogin;
  }

  //função para executar a chamada da API que irá cadastrar o formulario
  onExit(): void {
    //limpando os registros de segurança
    localStorage.clear();
    //redireciona a pagina para o login
    this.router.navigate(['/login']);
  }

  verificarLogin() {
    const login = localStorage.getItem('login');
    const token = localStorage.getItem('token');

    if (!login || login.trim() === '' || !token || token.trim() === '') {
      this.router.navigate(['/login']);
    }
  }
}
