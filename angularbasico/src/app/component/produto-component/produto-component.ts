import { Component, inject, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto-service';
import { ProdutoModel } from '../../models/produtoModel';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produto-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './produto-component.html',
  styleUrl: './produto-component.css'
})
export class ProdutoComponent implements OnInit {

  private service = inject(ProdutoService)

  produtos: ProdutoModel[] =[];
  novoNome = '';
  novaDescricao = '';
  novoPreco = 0;
  erro = '';

  loading = false

  //#region Private Methods

  ngOnInit() {
    this.carregar();
  }

  private carregar(){
    this.loading = true;
    this.service.listar()
      .subscribe({
        next: p => {
          this.produtos = p;
          this.loading = false;
        },
        error: e => {
          this.erro = e.message;
          this.loading = false;
        }
      })
  }

  // adicionar(){
  //   const nome = this.novoNome.trim();
  //   const descricao = this.novaDescricao.trim();
  //   const preco = this.novoPreco

  //   if(!nome) return;
  //   this.service.adicionar(nome, descricao, preco);
  //   this.novoNome = ''
  //   this.novaDescricao = ''
  //   this.novoPreco = 0
  //   this.carregar();
  // }

  // remover(id: number) {
  //   this.service.remover(id);
  //   this.carregar();
  // }

  //#endregion 





}
