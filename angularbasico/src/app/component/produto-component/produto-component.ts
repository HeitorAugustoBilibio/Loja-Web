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
  editarItem: ProdutoModel | null = null
  novaDescricao = '';
  novoPreco = 0;
  erro = '';
  sucesso = ''

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

  adicionar(){
    this.erro='';
    const precoNum = Number(this.novoPreco);
    if(!this.novoNome.trim()){
        this.erro = "Informe o nome"
        return;
    }

    if(!this.novaDescricao.trim()){
      this.erro = "Informe uma descricao"
      return;
    }

    if(Number.isNaN(precoNum) || precoNum < 0){
      this.erro = "Informe o preço"
      return;
    }

    const payLoad : ProdutoModel={
      id: '',
      nome: this.novoNome,
      descricao: this.novaDescricao,
      preco: this.novoPreco
    }

    this.loading = true;
    this.service.adicionar(payLoad).subscribe({
      next: (p) => {
        this.sucesso  = `produto ${p.nome} salvo com sucesso`
        this.loading = false;
        this.novoNome = '';
        this.novaDescricao = '';
        this.novoPreco = 0;
        this.carregar()

          setTimeout(() => this.sucesso = '', 3000);
      },
      error: (e) => {
          this.erro = e.message || "Falha ao salvar o produto"
          this.loading = false;
      }
    })
    

  }

  remover(id: string) {
    this.service.remover(id).subscribe({
      next: (message: string) => {
        this.sucesso = message || "Produto apagado"
        this.carregar();
        setTimeout(() => this.sucesso = '', 3000)
      },
      error: e => {
        this.erro = e.message || "Fudeu"
      }
    })
  }

  Editar(){
    if(!this.editarItem?.id){
      return;
    }
    this.loading = true;
    this.service.editar(this.editarItem.id, this.editarItem).subscribe({
      next: result =>{
        if(result){
          this.carregar();
          this.sucesso = 'Produto Atualizado com sucesso'
          setTimeout(() => this.sucesso = '', 3000);
        }
      },
      error: e =>{
        this.erro = e.message || "Falha ao editar"
      }
    });
  }



  //#endregion 





}
