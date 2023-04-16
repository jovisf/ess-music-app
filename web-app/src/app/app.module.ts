import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserlistingComponent } from './userlisting/userlisting.component';
import { UpdatepopupComponent } from './updatepopup/updatepopup.component';

import { FormsModule } from '@angular/forms';
// import { RouterModule }   from '@angular/router';
// import { MusicasComponent } from './musicas/musicas.component';
// import { MusicaService } from './musicas/musicas.service';
import { ListaMusicasComponent } from './lista-musicas/lista-musicas.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { MusicaService } from './musicas/musicas.service';
import { MusicasComponent } from './musicas/musicas.component';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { UserComponent } from './user/user.component';
import { ArtistaComponent } from './artista/artista.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { EditpopupComponent } from './editpopup/editpopup.component';
import { AddpopupComponent } from './addpopup/addpopup.component';
import { DeletepopupComponent } from './deletepopup/deletepopup.component';
import { UserSeDeletapopupComponent } from './user-se-deletapopup/user-se-deletapopup.component';
import { AlterarSenhaPopupComponent } from './alterar-senha-popup/alterar-senha-popup.component';
import { PlaylistUserComponent } from './playlist-user/playlist-user.component';
import { PlaylistCategoriaComponent } from './playlist-categoria/playlist-categoria.component';
import { PlaylistSeguidaComponent } from './playlist-seguida/playlist-seguida.component';
import { ArtistaAdminComponent } from './artista-admin/artista-admin.component';
import { AlbumComponent } from './album/album.component';
import { AlbumAdminComponent } from './album-admin/album-admin.component';
import { CadastraArtistaComponent } from './cadastra-artista/cadastra-artista.component';
import { CadastraAlbumComponent } from './cadastra-album/cadastra-album.component';
import { VisualizacaoAdminArtistasComponent } from './visualizacao-admin-artistas/visualizacao-admin-artistas.component';
import { CadastraAlbumService } from './cadastra-album/cadastra-album.service';
import { PlaylistAdminComponent } from './playlist-admin/playlist-admin.component';
import { EditaMusicaComponent } from './edita-musica/edita-musica.component';
import { EditaAlbumComponent } from './edita-album/edita-album.component';
import { PlaylistsCategoriaAdminComponent } from './playlists-categoria-admin/playlists-categoria-admin.component';
import { BibliotecaUsuarioComponent } from './biblioteca-usuario/biblioteca-usuario.component';
import { HistoricComponent } from './historic/historic.component';
import { TocadorComponent } from './tocador/tocador.component';
import { CadastraPlaylistComponent } from './cadastra-playlist/cadastra-playlist.component';
import { EditaArtistaComponent } from './edita-artista/edita-artista.component';
import { ResultadosPesquisaComponent } from './resultados-pesquisa/resultados-pesquisa.component';
import { EditarPlaylistComponent } from './editar-playlist/editar-playlist.component';
import { CriarCategoriaComponent } from './criar-categoria/criar-categoria.component';
import { SelecionarPlaylistComponent } from './selecionar-playlist/selecionar-playlist.component';
import { CategoriaPlaylistsComponent } from './categoria-playlists/categoria-playlists.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserlistingComponent,
    UpdatepopupComponent,
    ListaMusicasComponent,
    InitialPageComponent,
    MusicasComponent,
    UserAdminComponent,
    UserComponent,
    ArtistaComponent,
    UserEditComponent,
    EditpopupComponent,
    AddpopupComponent,
    DeletepopupComponent,
    UserSeDeletapopupComponent,
    AlterarSenhaPopupComponent,
    PlaylistUserComponent,
    PlaylistCategoriaComponent,
    PlaylistSeguidaComponent,
    ArtistaAdminComponent,
    AlbumComponent,
    AlbumAdminComponent,
    CadastraArtistaComponent,
    CadastraAlbumComponent,
    VisualizacaoAdminArtistasComponent,
    PlaylistAdminComponent,
    EditaMusicaComponent,
    EditaAlbumComponent,
    PlaylistCategoriaComponent,
    PlaylistsCategoriaAdminComponent,
    BibliotecaUsuarioComponent,
    HistoricComponent,
    TocadorComponent,
    CadastraPlaylistComponent,
    EditaArtistaComponent,
    EditarPlaylistComponent,
    ResultadosPesquisaComponent,
    CriarCategoriaComponent,
    SelecionarPlaylistComponent,
    CategoriaPlaylistsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [MusicaService, CadastraAlbumService],
  // providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }