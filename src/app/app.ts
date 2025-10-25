import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { LojaService } from './loja-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Loja';

  loja = inject(LojaService)
  
  constructor() {
    this.loja.obterProdutos().subscribe(res => {
      console.log('Produtos carregados:', res)
    })
  }
}