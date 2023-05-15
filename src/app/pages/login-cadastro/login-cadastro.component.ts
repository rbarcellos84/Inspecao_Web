import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment'; //importando as variaves globais
import { HttpClient } from '@angular/common/http'; //importando a biblioteca para a realização do ftp
import { HttpErrorResponse } from '@angular/common/http'; //tratamento de erro com a comunicação com api
import Swal from 'sweetalert2'; //mensagem de alerta na tela (npm i sweetalert2)

@Component({
  selector: 'app-login-cadastro',
  templateUrl: './login-cadastro.component.html',
  styleUrls: ['./login-cadastro.component.css']
})
export class LoginCadastroComponent implements OnInit {
  //criando uma variavel de retorno para api
  mensagem: string = '';

  constructor(
    //declara o inicializa a classe HttpClient
    private httpClient: HttpClient
  ) { }
  ngOnInit(): void {
  }

  formCadastroLogin = new FormGroup({
    nome: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(150), Validators.pattern('^[a-zA-Z0-9 ]{8,150}$')]),
    login: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern('^[a-zA-Z0-9]{8,12}$')]),
    senha: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[@!#$%&]).{8,20}$')]),
    confirmeSenha: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[@!#$%&]).{8,20}$')])
  });

  //funcção utilizada para exibir os erros de validação dos campos na pagina html
  get form(): any {
    return this.formCadastroLogin.controls;
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
    //validar os campos que estao sendo preenchido, impressao no console
    if (this.formCadastroLogin.controls.senha.value != this.formCadastroLogin.controls.confirmeSenha.value) {
      alert("O campos de confirmação de senha não confere com a senha fornecida.");
      return;
    }

    //teste para verificar os dados de entrada
    //console.log(this.formCadastroLogin.value);

    //chamada da api
    this.httpClient.post(environment.apiUrl + "api/account/RegistrarConta", this.formCadastroLogin.value)
      .subscribe(
        //subscribe captura a resposta da api
        (data: any) => {
          this.mensagem = data.mensagem;
          this.exibirAlerta('Inpeção Web', this.mensagem, 'success');
          //limpar campos do formulario
          this.formCadastroLogin.reset();
        },
        (error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            // Erro do lado do cliente
            this.exibirAlerta(error.error.message, 'Inspeção Web', 'error');
          } else {
            // Erro retornado pela API
            this.exibirAlerta(error.error.mensagem, 'Inspeção Web', 'error');
          }
        }
      );
  }
}