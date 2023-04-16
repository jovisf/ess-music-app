import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MusicaService } from '../musicas/musicas.service';

@Component({
selector: 'app-tocador',
templateUrl: './tocador.component.html',
styleUrls: ['./tocador.component.css']
})
export class TocadorComponent implements OnInit {

user: any;
musicaTitulo: string = '';
musicaId: number = 6;
artistaTitulo: string = '';

constructor(
private http: HttpClient,
private authService: AuthService,
private musicaService: MusicaService
) {}

ngOnInit(): void {
this.authService.GetbyCode(localStorage.getItem('username')).subscribe(res => {
this.user = res;
});

this.musicaService.getMusicaById(String(this.musicaId)).subscribe(res => {
  this.musicaTitulo = res.titulo;
  this.artistaTitulo = res.artistaNome;
});
}

tocar(): void {
const historicoAtualizado = this.user.historico || [];
historicoAtualizado.unshift(this.musicaId);
this.http.patch(`http://localhost:3000/user/${this.user.id}/`, {"historico" : historicoAtualizado}).subscribe();
console.log({message:'Música ouvida'});
this.avancar()
}

pausar(): void {
// Código para pausar música
}

avancar(): void {
this.musicaId += 1;
this.musicaService.getMusicaById(String(this.musicaId)).subscribe(res => {
this.musicaTitulo = res.titulo;
this.artistaTitulo = res.artistaNome;
});
}
}