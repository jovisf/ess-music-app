import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MusicaService } from '../musicas/musicas.service';
import { Musica } from '../musicas/musica';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.css'],
})
export class HistoricComponent implements OnInit {
  
  user: any;
  historico: number[] = [];
  musicas: Musica[] = [];
  musicasHistorico: Musica[] = [];

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private http: HttpClient,
    private musicaService: MusicaService
  ) {}

  ngOnInit(): void {
    this.initComponent();
  }

  private initComponent(): void {
    this.musicaService.getMusicas().subscribe(res => {
      this.musicas = res;
    });

    this.authService.GetbyCode(localStorage.getItem('username')).pipe(
      tap(res => {
        this.user = res;
        this.historico = this.user.historico;
      }),
      catchError(err => {
        console.error('Erro ao obter usuário:', err);
        return of(null);
      })
    ).subscribe(() => {
      this.filtrarMusicasHistorico();
    });
  }

  private filtrarMusicasHistorico(): void {
    this.musicasHistorico = this.musicas.filter(musica => this.historico.includes(musica.id)).reverse();
  }

  limparHistorico(): void {
    this.http.patch(`http://localhost:3000/user/${this.user.id}/`, {"historico" : []}).subscribe(() => {
      window.location.reload();
    });
  }
}