import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MusicaService } from '../musicas/musicas.service';
import { Musica } from '../musicas/musica';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.css'],
})
export class HistoricComponent {
  
  user: any;
  historico: number[] = [];
  musicas: Musica[] = [];
  musicasHistorico: Musica[] = [];


  constructor(private service: AuthService, private dialog: MatDialog, private http:HttpClient, private musicaService: MusicaService) {

    
    
    this.musicaService.getMusicas().subscribe(res => {
      this.musicas = res;
    })
    
  }





  limparHistorico(){ // limpa o historico de musicas
    this.http.patch(`http://localhost:3000/user/${this.user.id}/`, {"historico" : []}).subscribe();
    window.location.reload();
  }

  ngOnInit(): void {
    this.user = this.service.GetbyCode(localStorage.getItem('username')).subscribe(res => {
      this.user = res;
      this.historico = this.user.historico;
    // compara os ids nos historicos com todas as musicas no banco
    for (let index = 0; index < this.musicas.length; index++) { 
      for (let indexhistorico = 0; indexhistorico < this.historico.length; indexhistorico++) {
        if (this.historico[indexhistorico] == this.musicas[index].id) {
            this.musicasHistorico = [...this.musicasHistorico, this.musicas[index]] 
        } 
      }   
    }
    });
  }
}