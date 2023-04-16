import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Musica } from '../musicas/musica';
import { MusicaService } from '../musicas/musicas.service';
import { Album } from '../album/album';
import { CadastraAlbumService } from '../cadastra-album/cadastra-album.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-album-admin',
  templateUrl: './album-admin.component.html',
  styleUrls: ['./album-admin.component.css']
})
export class AlbumAdminComponent {
  constructor(private route: ActivatedRoute, private musicaService: MusicaService, private albumService: CadastraAlbumService, private router: Router, private service: AuthService) {}
  albumId: string = '';
  album: Album = new Album;
  musicas: Musica[] = [];
  isadminuser = false;


  ngOnInit() {
    this.albumId = this.route.snapshot.params['id'];

    this.albumService.getAlbumById(parseInt(this.albumId)).subscribe(album => {
      this.album = album;
    });

    this.musicaService.getMusicasByAlbum(this.albumId).subscribe(musicas => {
      this.musicas = musicas;
    });

    if (this.service.GetUserRole() === 'admin') {
      this.isadminuser = true;
    } else {
      this.isadminuser = false;
    }
  }

  cadastrarMusicas() {
    this.router.navigate(['albumAdmin', this.albumId, 'cadastrar-musica']);
  }

  removerAlbum() {
    this.albumService.deleteAlbumById(this.albumId).subscribe(() => {
      this.router.navigate(['visualizar-artistas-admin']);
    });
  }
  
  editarAlbum(id: number): void {
    this.router.navigate(['editar-album', id]);
  }

  removerMusica(musicaId: Number) {
    this.musicaService.deleteMusicaById(String(musicaId))
    window.location.reload();
  }
  
  editarMusica(id: number): void {
    this.router.navigate(['editar-musica', id]);
  }
  
  adicionarMusicaPlaylist(musicaId: number){
    this.router.navigate(['adiciona-musica-playlist', musicaId]);
  }
}
