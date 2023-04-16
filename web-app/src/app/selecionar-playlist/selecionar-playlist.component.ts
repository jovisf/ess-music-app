import { Component } from '@angular/core';
import { PlaylistService } from '../playlist-admin/playlist.service';
import { Playlist } from '../playlist-admin/playlist';
import { ActivatedRoute } from '@angular/router';
import { Musica } from '../musicas/musica';
import { Observable, map, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MusicaService } from '../musicas/musicas.service';

@Component({
  selector: 'app-selecionar-playlist',
  templateUrl: './selecionar-playlist.component.html',
  styleUrls: ['./selecionar-playlist.component.css']
})
export class SelecionarPlaylistComponent {
  private taURL = 'http://localhost:3000';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private route: ActivatedRoute, private playlistService: PlaylistService, private http: HttpClient, private musicaService: MusicaService){}
  playlists: Playlist[] = []
  musicaId: string = '';
  musica: Musica = new Musica;
  playlist: Playlist = new Playlist;
  adicionar = true;

  ngOnInit() {
    this.musicaId = this.route.snapshot.params['id'];

    this.playlistService.getPlaylists().subscribe(playlists => {
      this.playlists = playlists
    })

    this.musicaService.getMusicaById(this.musicaId).subscribe(musica => {
      this.musica = musica
    })
  }

  cadastraMusicaPlaylist(playlistId: number) {
    if (this.adicionar) {
      this.playlistService.getPlaylistById(String(playlistId)).subscribe((playlist) => {
        const musica = {
          id: this.musica.id,
          titulo: this.musica.titulo,
          capaAlbum: this.musica.capaAlbum,
          albumId: this.musica.albumId,
          artistaId: this.musica.artistaId,
          artistaNome: this.musica.artistaNome,
          tituloAlbum: this.musica.tituloAlbum,
        }
  
        // cria uma nova instância da playlist com a nova música adicionada
        const novaPlaylist = {
          id: playlist.id,
          titulo: playlist.titulo,
          privacidade: playlist.privacidade,
          url_foto_playlist: playlist.url_foto_playlist,
          categoria: playlist.categoria,
          usuario_dono: playlist.usuario_dono,
          musicas: [...playlist.musicas, musica],
          seguidores: playlist.seguidores
        }
  
        this.http.put(this.taURL + "/playlists/" + String(playlistId), novaPlaylist).subscribe(() => {
          console.log('Playlist atualizada com sucesso!');
        })
      });
    } else {
      // Remover música da playlist
      this.playlistService.deletaMusicaPlaylist(playlistId, Number(this.musicaId))
    }
  }

  toggleAdicionar(playlistId: number) {
    this.cadastraMusicaPlaylist(playlistId)
    window.location.reload()
    this.adicionar = !this.adicionar;
  }
}
