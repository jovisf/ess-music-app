import { Component } from '@angular/core';
import { PlaylistService } from '../playlist-admin/playlist.service';
import { AuthService } from '../service/auth.service';
import { Playlist } from '../playlist-admin/playlist';
import { Router } from '@angular/router';

@Component({
  selector: 'app-biblioteca-usuario',
  templateUrl: './biblioteca-usuario.component.html',
  styleUrls: ['./biblioteca-usuario.component.css']
})
export class BibliotecaUsuarioComponent {
  user: any
  playlists: Playlist[] = []
  playlistsSeguidas: Playlist[] = []

  constructor(private playlistService: PlaylistService, private service: AuthService, private router: Router){
    this.service.GetbyCode(localStorage.getItem('username')).subscribe(res => {
      this.playlistService.getPlaylists().subscribe((playlists) => {
        this.playlists = playlists.filter(playlist => {
          return JSON.stringify(playlist.usuario_dono) === JSON.stringify(res)
        });

        this.playlistsSeguidas = playlists.filter(playlist => {
          return playlist.seguidores.some(seguidor => seguidor.id === res.id)
        });
      });
    });
  }

  redirecionaTelaPlaylist(playlistId: number) {
    this.router.navigate(['/playlistAdmin',String(playlistId)]);
  }
}
