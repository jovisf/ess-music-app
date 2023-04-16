import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistService } from '../playlist-admin/playlist.service';
import { Album } from '../album/album';
import { Musica } from '../musicas/musica';
import { CadastraAlbumService } from '../cadastra-album/cadastra-album.service';
import { MusicaService } from '../musicas/musicas.service';

@Component({
  selector: 'app-playlist-categoria',
  templateUrl: './playlist-categoria.component.html',
  styleUrls: ['./playlist-categoria.component.css']
})
export class PlaylistCategoriaComponent {
  constructor(private route: ActivatedRoute, private cadastraAlbum: CadastraAlbumService, private musicaService: MusicaService, private router: Router, private playlistService: PlaylistService) {}
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

  cadastraMusicaPlaylist(musicaId: number) {
    this.router.navigate(['adiciona-musica-playlist', musicaId]);
  }

  irParaAlbum(albumId: Number) {
    this.router.navigate(['albumAdmin', String(albumId)]);
  }

  removerMusicaPlaylist(playlistId: number, musicaId: number){
    this.playlistService.deletaMusicaPlaylist(playlistId, musicaId)
    window.location.reload()
  }

  editarMusica(id: number): void {
    this.router.navigate(['editar-musica', id]);
  }

}
