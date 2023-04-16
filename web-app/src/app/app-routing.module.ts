import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { RoleGuard } from './guard/role.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserlistingComponent } from './userlisting/userlisting.component';
import { ListaMusicasComponent } from './lista-musicas/lista-musicas.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { MusicasComponent } from './musicas/musicas.component';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { UserComponent } from './user/user.component';
import { ArtistaComponent } from './artista/artista.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { PlaylistUserComponent } from './playlist-user/playlist-user.component';
import { PlaylistCategoriaComponent } from './playlist-categoria/playlist-categoria.component';
import { PlaylistSeguidaComponent } from './playlist-seguida/playlist-seguida.component';
import { ArtistaAdminComponent } from './artista-admin/artista-admin.component';
import { AlbumComponent } from './album/album.component';
import { AlbumAdminComponent } from './album-admin/album-admin.component';
import { CadastraArtistaComponent } from './cadastra-artista/cadastra-artista.component';
import { CadastraAlbumComponent } from './cadastra-album/cadastra-album.component';
import { VisualizacaoAdminArtistasComponent } from './visualizacao-admin-artistas/visualizacao-admin-artistas.component';
import { PlaylistAdminComponent } from './playlist-admin/playlist-admin.component';
import { EditaMusicaComponent } from './edita-musica/edita-musica.component';
import { EditaAlbumComponent } from './edita-album/edita-album.component';
import { PlaylistsCategoriaAdminComponent } from './playlists-categoria-admin/playlists-categoria-admin.component';
import { BibliotecaUsuarioComponent } from './biblioteca-usuario/biblioteca-usuario.component';
import { HistoricComponent } from './historic/historic.component';
import { EditaArtistaComponent } from './edita-artista/edita-artista.component';
import { CadastraPlaylistComponent } from './cadastra-playlist/cadastra-playlist.component';
import { EditarPlaylistComponent } from './editar-playlist/editar-playlist.component';
import { ResultadosPesquisaComponent } from './resultados-pesquisa/resultados-pesquisa.component';
import { CriarCategoriaComponent } from './criar-categoria/criar-categoria.component';
import { SelecionarPlaylistComponent } from './selecionar-playlist/selecionar-playlist.component';
import { CategoriaPlaylistsComponent } from './categoria-playlists/categoria-playlists.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'lista-usuarios', component: UserlistingComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'lista-musicas', component: ListaMusicasComponent, canActivate: [AuthGuard] },
  { path: 'initial-page', component: InitialPageComponent, canActivate: [AuthGuard] },
  { path: 'userAdmin', component: UserAdminComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'artista/:id', component: ArtistaComponent, canActivate: [AuthGuard] },
  { path: 'userEdit', component: UserEditComponent, canActivate: [AuthGuard] },
  { path: 'playlistUser', component: PlaylistUserComponent, canActivate: [AuthGuard] },
  { path: 'playlistCategoria', component: PlaylistCategoriaComponent, canActivate: [AuthGuard] },
  { path: 'playlistSeguida', component: PlaylistSeguidaComponent, canActivate: [AuthGuard] },
  { path: 'visualizar-artistas-admin/:id/:nome/:url_foto_artista/:categoria/artistaAdmin', component: ArtistaAdminComponent, canActivate: [AuthGuard] },
  { path: 'album/:id', component: AlbumComponent, canActivate: [AuthGuard] },
  { path: 'albumAdmin/:id', component: AlbumAdminComponent, canActivate: [AuthGuard] },
  { path: 'albumAdmin/:albumId/cadastrar-musica', component: MusicasComponent, canActivate: [AuthGuard] },
  { path: 'cadastrar-artista', component: CadastraArtistaComponent, canActivate: [AuthGuard] },
  { path: 'visualizar-artistas-admin/:id/cadastrar-album', component: CadastraAlbumComponent, canActivate: [AuthGuard] },
  { path: 'visualizar-artistas-admin', component: VisualizacaoAdminArtistasComponent, canActivate: [AuthGuard] },
  { path: 'playlistAdmin/:id', component: PlaylistAdminComponent, canActivate: [AuthGuard] },
  { path: 'editar-musica/:id', component: EditaMusicaComponent, canActivate: [AuthGuard] },
  { path: 'editar-album/:id', component: EditaAlbumComponent, canActivate: [AuthGuard] },
  { path: 'playlistsCategoriaAdmin', component: PlaylistsCategoriaAdminComponent, canActivate: [AuthGuard] },
  { path: 'bibliotecaUsuario', component: BibliotecaUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'editar-playlist/:id', component: EditarPlaylistComponent, canActivate: [AuthGuard] },
  { path: 'editar-artista/:id', component: EditaArtistaComponent, canActivate: [AuthGuard] },
  { path: 'cadastraPlaylist', component: CadastraPlaylistComponent, canActivate: [AuthGuard] },
  { path: 'resultadosPesquisa', component: ResultadosPesquisaComponent, canActivate: [AuthGuard] },
  { path: 'cadastrar-categoria', component: CriarCategoriaComponent},
  { path: 'adiciona-musica-playlist/:id', component: SelecionarPlaylistComponent, canActivate: [AuthGuard] },
  { path: 'historic', component: HistoricComponent, canActivate:[AuthGuard]},
  { path: 'categoria-playlists', component: CategoriaPlaylistsComponent, canActivate:[AuthGuard]},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }