import { Component, OnInit } from '@angular/core';
import { Musica } from '../musicas/musica';
import { MusicaService } from '../musicas/musicas.service';
import { Router } from '@angular/router';
import { PlaylistService } from '../playlist-admin/playlist.service';

@Component({
  selector: 'app-lista-musicas',
  templateUrl: './lista-musicas.component.html',
  styleUrls: ['./lista-musicas.component.css']
})

export class ListaMusicasComponent implements OnInit {

  musicas: Musica[] = [];
  filter: string = "";

  constructor(private musicaService: MusicaService, private router: Router, private playlistService:PlaylistService) {}

  ngOnInit() {
    this.musicaService.getMusicas()
      .subscribe((musicas) => {
        this.musicas = musicas;
        console.log(musicas)
      });
  }

  editarMusica(id: number): void {
    this.router.navigate(['editar-musica', id]);
  }

  removerMusica(musicaId: Number) {
    this.musicaService.deleteMusicaById(String(musicaId))
    window.location.reload();
  }

  cadastraMusicaPlaylist(musicaId: number) {
    this.router.navigate(['adiciona-musica-playlist', musicaId]);
  }

  removerMusicaPlaylist(playlistId: number, musicaId: number){
    this.playlistService.deletaMusicaPlaylist(playlistId, musicaId)
    window.location.reload()
  }

  irParaAlbum(albumId: Number) {
    this.router.navigate(['albumAdmin', String(albumId)]);
  }
}
