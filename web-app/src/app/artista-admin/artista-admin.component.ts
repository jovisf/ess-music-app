import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastraAlbumService } from '../cadastra-album/cadastra-album.service';
import { MusicaService } from '../musicas/musicas.service';
import { Album } from '../album/album';
import { Musica } from '../musicas/musica';
import { CadastraArtistaService } from '../cadastra-artista/cadastra-artista.service';
import { PlaylistService } from '../playlist-admin/playlist.service';

@Component({
  selector: 'app-artista-admin',
  templateUrl: './artista-admin.component.html',
  styleUrls: ['./artista-admin.component.css']
})
export class ArtistaAdminComponent implements OnInit {
  constructor(private route: ActivatedRoute, private cadastraAlbum: CadastraAlbumService, private musicaService: MusicaService, private router: Router, private artistaService: CadastraArtistaService, private playlistService: PlaylistService) {}
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

  cadastrarAlbum() {
    this.router.navigate(['visualizar-artistas-admin', this.artistaId, 'cadastrar-album']);
  }

  visualizarAlbum(albumId: Number) {
    this.router.navigate(['albumAdmin', String(albumId)]);
  }

  removerMusica(musicaId: Number) {
    this.musicaService.deleteMusicaById(String(musicaId))
    window.location.reload();
  }

  irParaAlbum(albumId: Number) {
    this.router.navigate(['albumAdmin', String(albumId)]);
  }

  cadastraMusicaPlaylist(musicaId: number) {
    this.router.navigate(['adiciona-musica-playlist', musicaId]);
  }

  removerMusicaPlaylist(playlistId: number, musicaId: number){
    this.playlistService.deletaMusicaPlaylist(playlistId, musicaId)
    window.location.reload()
  }
  
  deletarArtista() {
    this.artistaService.deleteArtistaById(this.artistaId).subscribe(() => {
      window.location.href = 'visualizar-artistas-admin'
    });
  }

  editarMusica(id: number): void {
    this.router.navigate(['editar-musica', id]);
  }

  editarArtista(artistaId: string) {
    this.router.navigate(['editar-artista', artistaId])
  }
}