import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { first, firstValueFrom } from 'rxjs';
import { URL_REQUEST } from 'src/constants';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SongSearchService {
  httpClient = inject(HttpClient);

  constructor() {}

  getSong(idSong: string): Promise<any> {
    const myToken = localStorage.getItem('token');

    const headers = new HttpHeaders({ Authorization: `${myToken}` });

    return firstValueFrom(
      this.httpClient.get<any>(`${URL_REQUEST.GET_SONG}/${idSong}`, { headers })
    );
  }

  getTopSongs(): Promise<any> {
    const myToken = localStorage.getItem('token');

    const headers = new HttpHeaders({ Authorization: `${myToken}` });
    return firstValueFrom(
      this.httpClient.get<any>(URL_REQUEST.TOP_SONGS, { headers })
    );
  }

  getArtistInfo(idArtist: string): Promise<any> {
    const myToken = localStorage.getItem('token');

    const headers = new HttpHeaders({ Authorization: `${myToken}` });
    return firstValueFrom(
      this.httpClient.get<any>(`${URL_REQUEST.GET_ARTIST}/${idArtist}`, {
        headers,
      })
    );
  }

  getArtistAlbums(idArtist: string): Promise<any> {
    const myToken = localStorage.getItem('token');

    const headers = new HttpHeaders({ Authorization: `${myToken}` });

    return firstValueFrom(
      this.httpClient.get<any>(
        `${URL_REQUEST.GET_ARTIST_ALBUMS}/${idArtist}?limit=6`,
        { headers }
      )
    );
  }

  getTopArtist(): Promise<any> {
    const myToken = localStorage.getItem('token');

    const headers = new HttpHeaders({ Authorization: `${myToken}` });

    return firstValueFrom(
      this.httpClient.get<any>(URL_REQUEST.GET_ARTISTS, { headers })
    );
  }

  getNewAlbums(): Promise<any> {
    const myToken = localStorage.getItem('token');

    const headers = new HttpHeaders({ Authorization: `${myToken}` });

    return firstValueFrom(
      this.httpClient.get<any>(URL_REQUEST.NEW_ALBUMS, { headers })
    );
  }

  getAlbumInfo(idAlbum: string): Promise<any> {
    const myToken = localStorage.getItem('token');

    const headers = new HttpHeaders({ Authorization: `${myToken}` });
    return firstValueFrom(
      this.httpClient.get<any>(`${URL_REQUEST.GET_ALBUM}/${idAlbum}`, {
        headers,
      })
    );
  }

  getGenres(): Promise<any> {
    const myToken = localStorage.getItem('token');

    const headers = new HttpHeaders({ Authorization: `${myToken}` });
    return firstValueFrom(
      this.httpClient.get<any>(URL_REQUEST.GET_GENRES, { headers })
    );
  }

  getSongsByGenre(genre: string, page: number = 1): Promise<any> {
    const myToken = localStorage.getItem('token');

    const headers = new HttpHeaders({ Authorization: `${myToken}` });

    return firstValueFrom(
      this.httpClient.get<any>(
        `${URL_REQUEST.GET_SONGS_BY_GENRE}/${genre}?page=${page}`,
        { headers }
      )
    );
  }

  getSongByName(name: string, page: number = 1): Promise<any> {
    const myToken = localStorage.getItem('token');

    const headers = new HttpHeaders({ Authorization: `${myToken}` });

    const peticion = `${URL_REQUEST.GET_SONGS_BY_NAME}/${name}?page=${page}`;

    const result = firstValueFrom(
      this.httpClient.get<any>(peticion, { headers })
    );

    return result;
  }

  getPlaylists(): Promise<any> {
    const myToken = localStorage.getItem('token');

    console.log(myToken);

    const headers = new HttpHeaders({
      Authorization: `${myToken}`,
    });

    return firstValueFrom(
      this.httpClient.get<any>(URL_REQUEST.GET_PLAYLISTS, { headers })
    );
  }

  newPlaylist(playlist: any): Promise<any> {
    const myToken = localStorage.getItem('token');

    console.log(myToken);

    const headers = new HttpHeaders({
      Authorization: `${myToken}`,
    });

    return firstValueFrom(
      this.httpClient.post<any>(URL_REQUEST.CRETE_PLAYLIST, playlist, {
        headers,
      })
    );
  }

  deletePlaylist(playlistId: string): Promise<any> {
    const myToken = localStorage.getItem('token');

    const headers = new HttpHeaders({ Authorization: `${myToken}` });

    return firstValueFrom(
      this.httpClient.delete<any>(
        `${URL_REQUEST.DELETE_PLAYLIST}/${playlistId}`,
        { headers }
      )
    );
  }

  getPlaylistById(playlistId: string): Promise<any> {
    const myToken = localStorage.getItem('token');

    const headers = new HttpHeaders({ Authorization: `${myToken}` });
    return firstValueFrom(
      this.httpClient.get<any>(`${URL_REQUEST.GET_PLAYLIST}/${playlistId}`, {
        headers,
      })
    );
  }

  uploadSong(song: any): Promise<any> {
    const myToken = localStorage.getItem('token');

    const headers = new HttpHeaders({ Authorization: `${myToken}` });

    return firstValueFrom(
      this.httpClient.post<any>(URL_REQUEST.UPLOAD_SONG, song, { headers })
    );
  }
}
