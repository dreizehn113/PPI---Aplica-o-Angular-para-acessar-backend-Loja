import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LojaService } from '../loja-service';
import { Produto } from '../produto';

@Component({
  selector: 'app-detalhes-produto',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './detalhes-produto.html',
  styleUrls: ['./detalhes-produto.css']
})
export class DetalhesProdutoComponent implements OnInit {
  private lojaService = inject(LojaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  
  produto: Produto | null = null;
  idPesquisa: number | null = null;
  idAtual: number | null = null;
  carregando = false;
  erro: string | null = null;

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.idAtual = id;
        this.idPesquisa = id; 
        this.carregarProduto(id);
      }
    });
  }

  carregarProduto(id: number) {
    this.carregando = true;
    this.erro = null;
    this.produto = null;
    
    this.lojaService.obterProdutoPorId(id).subscribe({
      next: (produto) => {
        this.produto = produto;
        this.carregando = false;
      },
      error: (error) => {
        this.erro = 'Produto não encontrado';
        this.produto = null;
        this.carregando = false;
      }
    });
  }

  pesquisarPorId() {
    if (this.idPesquisa && this.idPesquisa >= 1 && this.idPesquisa <= 10) {
      this.router.navigate(['/produto', this.idPesquisa]);
    }
  }
}