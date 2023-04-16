import { Component } from '@angular/core';
import { CadastraArtistaService } from '../cadastra-artista/cadastra-artista.service';
import { Artista } from '../artista/artista';
import { Musica } from '../musicas/musica';
import { Album } from '../album/album';
import { CadastraAlbumService } from '../cadastra-album/cadastra-album.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from '../criar-categoria/categoria';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edita-artista',
  templateUrl: './edita-artista.component.html',
  styleUrls: ['./edita-artista.component.css']
})
export class EditaArtistaComponent {
  id: number = 0;
  musicas: Musica[] = [];
  albums: Album[] = [];
  artista: Artista = new Artista;
  categorias: Categoria[] = [];
  categoriasSelecionadas: Categoria[] = [];

  private taURL = 'http://localhost:3000';

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private http: HttpClient,
    private albumService: CadastraAlbumService,
    private artistaService: CadastraArtistaService
  ) {}


  ngOnInit() {
    this.id = + this.route.snapshot.params['id'];
    this.artistaService.getArtistaById(String(this.id)).subscribe(artista => {
      this.artista = artista
    })
    this.albumService.getAlbumsByArtista(String(this.id)).subscribe(albums => {
      this.albums = albums
    })

    this.http.get<any[]>(this.taURL+'/categorias').subscribe(
      (categorias) => {
        this.categorias = categorias;
      },
      (error) => {
        console.error('Erro ao carregar categorias:', error);
      }
    );
  }

  editarArtista(artista: Artista) {
    const novoNome = (<HTMLInputElement>document.getElementById("artista-nome")).value;
    const novoCategoria = (<HTMLInputElement>document.getElementById("artista-categoria")).value;
    const novaImagem = (<HTMLInputElement>document.getElementById("artista-url_foto_artista")).value;
    
    if(
      novoNome == "" ||
      novaImagem == ""
    ){
      this.toastr.error('Campo inválido!');
      return;
    }

    // Requisição PUT para atualizar o artista
    this.http.put(this.taURL + "/artistas/" + String(artista.id), {
      nome: novoNome || this.artista.nome,
      categoria: novoCategoria || this.artista.categoria,
      url_foto_artista: novaImagem || this.artista.categoria,
    }).subscribe(() => {
      console.log('Artista atualizado com sucesso!');
      this.toastr.success('Artista alterado!');
  
      // Atualização do nome do artista em cada álbum
      this.albums.forEach((album: Album) => {
        this.http.put(this.taURL + "/albums/" + String(album.id), {
          nome: album.nome,
          artistaId: album.artistaId,
          url_foto_album: album.url_foto_album,
          artistaNome: novoNome || this.artista.nome,
          ano_lancamento: album.ano_lancamento
        }).subscribe(() => {
          console.log('Nome do artista atualizado com sucesso no álbum!');

          // Requisição GET para buscar todas as músicas do álbum
          this.http.get<any>(this.taURL + "/musicas/?artistaId=" + String(artista.id))
            .subscribe((musicas: Musica[]) => {
              // Atualização do nome do artista em cada música
              musicas.forEach((musica: Musica) => {
                this.http.put(this.taURL + "/musicas/" + String(musica.id), {
                  titulo: musica.titulo,
                  albumId: musica.albumId,
                  artistaId: musica.artistaId,
                  capaAlbum: musica.capaAlbum,
                  artistaNome: novoNome || this.artista.nome,
                  tituloAlbum: musica.tituloAlbum
                }).subscribe(() => {
                  console.log('Nome do artista atualizado com sucesso na música!');
                }, (error) => {
                  console.error('Ocorreu um erro ao atualizar o nome do artista na música:', error);
                });
              });
            }, (error) => {
              console.error('Ocorreu um erro ao buscar as músicas do álbum:', error);
            });
        }, (error) => {
          console.error('Ocorreu um erro ao atualizar o nome do artista no álbum:', error);
        });
      });
  
      setTimeout(
        () => {
          // Redirecionamento para a página de detalhes do artista
          window.location.href = "/visualizar-artistas-admin";
        }, 2000
      )
    }, (error) => {
      console.error('Ocorreu um erro ao atualizar o artista:', error);
    });
  }  

  cancelEditarArtista() {
    window.history.back();
  }
}