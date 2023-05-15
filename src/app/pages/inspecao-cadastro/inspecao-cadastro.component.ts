import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment'; //importando as variaves globais
import { HttpClient, HttpHeaders } from '@angular/common/http'; //HttpClient para realizar o ftp / HttpHeaders para passagem de token
import { Router } from '@angular/router'; //redirecionamente de rota
import { HttpErrorResponse } from '@angular/common/http'; //tratamento de erro com a comunicação com api
import Swal from 'sweetalert2'; //mensagem de alerta na tela (npm i sweetalert2)

@Component({
  selector: 'app-inspecao-cadastro',
  templateUrl: './inspecao-cadastro.component.html',
  styleUrls: ['./inspecao-cadastro.component.css']
})
export class InspecaoCadastroComponent implements OnInit {
  //criando uma variavel de retorno para api
  mensagem: string = '';
  usuarioClicouOK: boolean = false;

  constructor(
    //declara o inicializa a classe HttpClient
    private httpClient: HttpClient,
    private router: Router) {
  }

  ngOnInit(): void {
    //verifica autorização
    this.verificarLogin();
  }

  formInspecaoCadastro = new FormGroup({
    login: new FormControl(localStorage.getItem('login')),
    codigoEmpresa: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern('^[a-zA-Z0-9]{8,12}$')]),
    codigoCorretor: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern('^[a-zA-Z0-9]{8,12}$')]),
    codigoProduto: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern('^[a-zA-Z0-9]{8,12}$')]),
    nomeProduto: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9 ]{3,50}$')]),
    numeroInspecao: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern('^[0-9]{8,12}$')])
  });

  //funcção utilizada para exibir os erros de validação dos campos na pagina html
  get form(): any {
    return this.formInspecaoCadastro.controls;
  };

  //função para executar a chamada da API que irá cadastrar o formulario
  onSubmit(): void {
    //teste para verificar os dados de entrada
    //console.log(this.formInspecaoCadastro.value);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    //chamada da api
    this.httpClient.post(environment.apiUrl + "api/Inspecao/RegistrarInspecao", this.formInspecaoCadastro.value, { headers })
      .subscribe(
        //subscribe captura a resposta da api
        (data: any) => {
          this.mensagem = data.mensagem;
          this.notificacaoCadastro(this.mensagem, 'Inspeção Web', 'success');
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
      );
  }

  verificarLogin() {
    const login = localStorage.getItem('login');
    const token = localStorage.getItem('token');

    if (!login || login.trim() === '' || !token || token.trim() === '') {
      this.exibirAlerta('Usuário não atorizado', 'Inpeção Web', 'warning');
      this.router.navigate(['/login']);
    }
  }

  reiniciarTela() {
    this.formInspecaoCadastro.reset();
    location.reload();
  }

  //mensagem de alerta
  exibirAlerta(mensagem: string, titulo: string, tipoIcone: 'success' | 'error' | 'warning' | 'info' | 'question') {
    Swal.fire({
      title: titulo,
      text: mensagem,
      icon: tipoIcone
    });
  }

  notificacaoCadastro(mensagem: string, titulo: string, tipoIcone: 'success' | 'error' | 'warning' | 'info' | 'question') {
    Swal.fire({
      title: titulo,
      text: mensagem,
      icon: tipoIcone,
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reiniciarTela();
      } else {
        this.reiniciarTela();
      }
    });
  }
}
