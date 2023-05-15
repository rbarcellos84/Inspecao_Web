import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment'; //importando as variaves globais
import { HttpClient, HttpHeaders } from '@angular/common/http'; //HttpClient para realizar o ftp / HttpHeaders para passagem de token
import { Router } from '@angular/router'; //redirecionamente de rota
import { HttpErrorResponse } from '@angular/common/http'; //tratamento de erro com a comunicação com api
import Swal from 'sweetalert2'; //mensagem de alerta na tela (npm i sweetalert2)

@Component({
  selector: 'app-inspecao-consulta',
  templateUrl: './inspecao-consulta.component.html',
  styleUrls: ['./inspecao-consulta.component.css']
})
export class InspecaoConsultaComponent implements OnInit {
  //criar variavel global para guardar a lista de objetos fornecido pela consulta - API
  listaInspecao: any[] = [];
  mensagem: string = '';

  constructor(
    //declara o inicializa a classe HttpClient
    private httpClient: HttpClient,
    private router: Router) {
  }

  //metodo executado antes do componente abrir/renderizar
  ngOnInit(): void {
    //verifica autorização
    this.verificarLogin();

    const login = localStorage.getItem('login');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    //realizar a chamada da consulta API para realizar a consulta sem parametros
    this.httpClient.get(environment.apiUrl + "api/Inspecao/SelecionarInspecao/?login=" + login, { headers })
      .subscribe(
        (data) => {
          this.listaInspecao = data as any[];
        },
        (error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            // Erro do lado do cliente
            this.exibirAlerta(error.error.message, 'Inspeção Web', 'error');
          } else {
            // Erro retornado pela API
            if (error.error.mensagem != "")
              this.exibirAlerta(error.error.mensagem, 'Inspeção Web', 'error');
            else
              this.exibirAlerta('Falaha na comunicação com o servidor.', 'Inspeção Web', 'error');
          }
        }
      )
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