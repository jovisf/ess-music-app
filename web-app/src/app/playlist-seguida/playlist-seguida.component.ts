import { Component } from '@angular/core';
import { ResultadoPesquisaService } from '../resultados-pesquisa/resultado-pesquisa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicaService } from '../musicas/musicas.service';
import { CadastraAlbumService } from '../cadastra-album/cadastra-album.service';
import { Album } from '../album/album';
import { Musica } from '../musicas/musica';

@Component({
  selector: 'app-playlist-seguida',
  templateUrl: './playlist-seguida.component.html',
  styleUrls: ['./playlist-seguida.component.css']
})
export class PlaylistSeguidaComponent {
  constructor(private resultados: ResultadoPesquisaService, private router: Router, private route: ActivatedRoute, private cadastraAlbum: CadastraAlbumService, private musicaService: MusicaService) {}
  artistaId: string = '';
  artistaNome: string = '';
  artistaCategoria: string = '';
  artistaUrlFoto: string = '';
  albums: Album[] =  [];
  musicas: Musica[] = [];

  ngOnInit(): void {
    this.artistaId = this.route.snapshot.params['id'];
    this.artistaNome = this.route.snapshot.params['nome'];
    this.artistaCategoria = this.route.snapshot.params['categoria'];
    this.artistaUrlFoto = this.route.snapshot.params['url_foto_artista'];

    this.cadastraAlbum.getAlbumsByArtista(this.artistaId).subscribe(albums => {
      this.albums = albums;
    });

    this.musicaService.getMusicasByArtista(this.artistaId).subscribe(musicas => {
      this.musicas = musicas;
    });
  }
  pesquisar(){
    this.resultados.pesquisar()
  }

  cadastraMusicaPlaylist(musicaId: number) {
    this.router.navigate(['adiciona-musica-playlist', musicaId]);
  }

  irParaAlbum(albumId: Number) {
    this.router.navigate(['albumAdmin', String(albumId)]);
  }
}