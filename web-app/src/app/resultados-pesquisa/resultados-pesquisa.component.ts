import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Artista } from '../artista/artista';
import { Album } from '../album/album';
import { Musica } from '../musicas/musica';
import { ResultadoPesquisaService } from './resultado-pesquisa.service';

@Component({
  selector: 'app-resultados-pesquisa',
  templateUrl: './resultados-pesquisa.component.html',
  styleUrls: ['./resultados-pesquisa.component.css']
})
export class ResultadosPesquisaComponent {
  artistas: Artista[] = []
  albuns: Album[] = []
  musicas: Musica[] = []
  constructor(private route: ActivatedRoute, private resultadosService: ResultadoPesquisaService, private router: Router) {}

  ngOnInit(){
    this.artistas = this.resultadosService.artistas
    this.albuns = this.resultadosService.albuns
    this.musicas = this.resultadosService.musicas

    console.log(this.artistas, this.albuns, this.musicas)
  }

  cadastraMusicaPlaylist(musicaId: number) {
    this.router.navigate(['adiciona-musica-playlist', musicaId]);
  }

  irParaAlbum(albumId: Number) {
    this.router.navigate(['albumAdmin', String(albumId)]);
  }

  irParaArtista(artistaId: Number) {
    this.router.navigate(['artista', String(artistaId)]);
  }
}