import { Component } from '@angular/core';
import { CadastraArtistaService } from './cadastra-artista.service';
import { Artista } from '../artista/artista';
import { Categoria } from '../criar-categoria/categoria';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastra-artista',
  templateUrl: './cadastra-artista.component.html',
  styleUrls: ['./cadastra-artista.component.css']
})
export class CadastraArtistaComponent {
  constructor(
    private cadastraArtistaService: CadastraArtistaService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}
  artista: Artista = new Artista();
  artistas: Artista[] = [];
  categorias: Categoria[] = [];
  categoriasSelecionadas: Categoria[] = [];

  createArtista(c: Artista): void {
    if(
      c.nome == "" ||
      c.url_foto_artista == ""
    ){
      this.toastr.error('Campo inválido!');
      return;
    }
    
     this.cadastraArtistaService.create(c)
     .subscribe(result => {
           if (result) {
              this.toastr.success('Artista cadastrado!');
              this.artistas.push(<Artista> result);
              this.artista = new Artista();
           }
        });
  }

  cancelCreateArtista() {
    window.history.back();
  }
  
  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/categorias').subscribe(
      (categorias) => {
        this.categorias = categorias;
      },
      (error) => {
        console.error('Erro ao carregar categorias:', error);
      }
    );
  }

}