import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MusicaService } from '../musicas/musicas.service';
import { CadastraArtistaService } from '../cadastra-artista/cadastra-artista.service';

@Component({
  selector: 'app-tocador',
  templateUrl: './tocador.component.html',
  styleUrls: ['./tocador.component.css']
})


export class TocadorComponent {

  user:any;
  musicaTitulo: string = '';
  musicaId: number = 6;
  artistaTitulo: string = '';
  constructor(private http:HttpClient, private service: AuthService, private dialog: MatDialog, private musicaService: MusicaService) {


    this.user = this.service.GetbyCode(localStorage.getItem('username')).subscribe(res => {
      this.user = res;
    });

    this.musicaService.getMusicaById(String(this.musicaId)).subscribe(res => {
      this.musicaTitulo = res.titulo;
    })
    this.musicaService.getMusicaById(String(this.musicaId)).subscribe(res => {
      this.artistaTitulo = res.artistaNome;
    })

  }

  tocar() {
      const historicoAtualizado = this.user.historico || []; // Verifica se já existe um histórico. Caso não exista, usa um array vazio
      historicoAtualizado.unshift(this.musicaId)
      //const historicoAtualizado = [ this.musicaId, ...historicoAntigo]; // Adiciona o novo ID da música ao histórico antigo
      this.http.patch(`http://localhost:3000/user/${this.user.id}/`, {"historico" : historicoAtualizado}).subscribe();
      console.log({string:'Música ouvida'});
      this.avancar();
      }

  pausar() {
    // Código para pausar música
  }

  avancar(){
    this.musicaId += 1;
    this.musicaService.getMusicaById(String(this.musicaId)).subscribe(res => {
      this.musicaTitulo = res.titulo;
    })
    this.musicaService.getMusicaById(String(this.musicaId)).subscribe(res => {
      this.artistaTitulo = res.artistaNome;
    })
  };
}