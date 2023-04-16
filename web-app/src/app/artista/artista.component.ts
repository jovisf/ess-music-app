import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from '../album/album';
import { Musica } from '../musicas/musica';
import { CadastraAlbumService } from '../cadastra-album/cadastra-album.service';
import { MusicaService } from '../musicas/musicas.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent {
  constructor(private router: Router, private route: ActivatedRoute, private cadastraAlbum: CadastraAlbumService, private musicaService: MusicaService) {}
  artistaId: string = '';
  artistaNome: string = '';
  artistaCategoria: string = '';
  artistaUrlFoto: string = '';
  albums: Album[] =  [];
  musicas: Musica[] = [];
  i: number = 0;

  ngOnInit() {
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
  
  cadastraMusicaPlaylist(musicaId: number) {
    this.router.navigate(['adiciona-musica-playlist', musicaId]);
  }

  irParaAlbum(albumId: Number) {
    this.router.navigate(['albumAdmin', String(albumId)]);
  }
}
