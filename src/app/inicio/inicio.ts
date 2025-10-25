import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LojaService } from '../loja-service';
import { Produto } from '../produto';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class InicioComponent implements OnInit {
  private lojaService = inject(LojaService);
  
  produtos: Produto[] = [];
  carregando = false;
  erro: string | null = null;

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.carregando = true;
    this.erro = null;
    
    this.lojaService.obterProdutos().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
        this.carregando = false;
      },
      error: (error) => {
        this.erro = error.message || 'Erro desconhecido';
        this.carregando = false;
        console.error('Erro ao carregar produtos:', error);
      }
    });
  }
}