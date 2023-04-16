import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Playlist } from './playlist';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private taURL = 'http://localhost:3000';
  user: any;

  constructor(private http: HttpClient, private service: AuthService, private router: Router) {
    this.service.GetbyCode(localStorage.getItem('username')).subscribe(res => {
      this.user = res;
    });
  }

  createPlaylist(playlist: Playlist): Observable<Playlist | null>{
    const novaPrivacidade = (<HTMLInputElement>document.getElementById("playlist-privacidade")).value;
    const novaCategoria = (<HTMLInputElement>document.getElementById("playlist-categoria")).value;

    const newPlaylists = {
      id: playlist.id,
      titulo: playlist.titulo,
      privacidade: novaPrivacidade,
      categoria: novaCategoria,
      url_foto_playlist: playlist.url_foto_playlist,
      usuario_dono: this.user,
      musicas: [],
      seguidores: playlist.seguidores
    };

    return this.http.post(this.taURL + "/playlists", JSON.stringify(newPlaylists), { headers: this.headers, observe: "response" })
      .pipe(map(res => {
        if (res.status === 201) { return playlist; } else { return null; }
      }));
  }

  getPlaylistById(playlistId: string) {
    return this.http.get(this.taURL + '/playlists/' + playlistId, { 'observe': 'body' })
      .pipe(map(res => res as Playlist));
  }

  getPlaylists(): Observable<Playlist[]> {
    return this.http.get(this.taURL + "/playlists", { "observe": "body" })
      .pipe(map(res => res as Playlist[]));
  }

  deletePlaylist(playlistId: string) {
    this.http.delete(this.taURL + "/playlists/" + playlistId, { observe: 'response' }).subscribe(res => {
      this.router.navigate(['playlistsCategoriaAdmin']);
    });
  }

  deletaMusicaPlaylist(playlistId: number, musicaId: number) {
    this.getPlaylistById(String(playlistId)).subscribe((playlist) => {
      // cria uma nova instância da playlist com a nova música adicionada
      const novaPlaylist = {
        id: playlist.id,
        titulo: playlist.titulo,
        privacidade: playlist.privacidade,
        url_foto_playlist: playlist.url_foto_playlist,
        categoria: playlist.categoria,
        usuario_dono: playlist.usuario_dono,
        musicas: playlist.musicas.filter(m => m.id !== musicaId), // remove a música com o id correspondente da playlist
        seguidores: playlist.seguidores
      }

      this.http.put(this.taURL + "/playlists/" + String(playlistId), novaPlaylist).subscribe(() => {
        console.log('Música removida da playlist com sucesso!');
      })
    });
  }
}
