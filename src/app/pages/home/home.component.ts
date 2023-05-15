import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; //redirecionamente de rota
import Swal from 'sweetalert2'; //mensagem de alerta na tela (npm i sweetalert2)

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    //verifica autorização
    this.verificarLogin();
  }

  verificarLogin() {
    const login = localStorage.getItem('login');
    const token = localStorage.getItem('token');

    if (!login || login.trim() === '' || !token || token.trim() === '') {
      this.exibirAlerta('Usuário não atorizado','Inpeção Web','warning');
      this.router.navigate(['/login']);
    }
  }

  //mensagem de alerta
  exibirAlerta(mensagem: string, titulo: string, tipoIcone: 'success' | 'error' | 'warning' | 'info' | 'question') {
    Swal.fire({
      title: titulo,
      text: mensagem,
      icon: tipoIcone
    });
  }
}
