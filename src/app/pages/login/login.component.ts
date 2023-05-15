import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment'; //importando as variaves globais
import { HttpClient } from '@angular/common/http'; //importando a biblioteca para a realização do ftp
import { HttpErrorResponse } from '@angular/common/http'; //tratamento de erro com a comunicação com api
import Swal from 'sweetalert2'; //mensagem de alerta na tela (npm i sweetalert2)
import { Router } from '@angular/router';
import { HttpContextToken } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //criando uma variavel de retorno para api
  mensagem: string = '';
  login: string = "";
  token: string = "";

  constructor(
    //declara o inicializa a classe HttpClient
    private httpClient: HttpClient,
    private router: Router) {
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  formLogin = new FormGroup({
    login: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
    senha: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
  });

  //funcção utilizada para exibir os erros de validação dos campos na pagina html
  get form(): any {
    return this.formLogin.controls;
  };

  //mensagem de alerta
  exibirAlerta(mensagem: string, titulo: string, tipoIcone: 'success' | 'error' | 'warning' | 'info' | 'question') {
    Swal.fire({
      title: titulo,
      text: mensagem,
      icon: tipoIcone
    });
  }

  //função para executar a chamada da API que irá cadastrar o formulario
  onSubmit(): void {
    //teste para verificar os dados de entrada
    //console.log(this.formLogin.value);

    //limpando os registros
    localStorage.clear();

    //chamada da api
    this.httpClient.post(environment.apiUrl + "api/account/Login", this.formLogin.value)
      .subscribe(
        //subscribe captura a resposta da api
        (data: any) => {
          this.mensagem = data.mensagem;
          //grava autenticação e redireciona para pagina principal
          localStorage.setItem('login', data.login);
          localStorage.setItem('token', data.token);
          this.router.navigate(['/home']);
        },
        (error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            // Erro do lado do cliente
            this.exibirAlerta(error.error.message, 'Inspeção Web', 'error');
          } else {
            // Erro retornado pela API
            if (error.error.mensagem!="")
              this.exibirAlerta(error.error.mensagem, 'Inspeção Web', 'error');
            else
              this.exibirAlerta('Falaha na comunicação com o servidor.', 'Inspeção Web', 'error');
          }
        }
      );
  }
}