import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { URL_REQUEST } from 'src/constants';

@Injectable({
  providedIn: 'root',
})
export class SongSearchService {
  httpClient = inject(HttpClient);

  constructor() {}

  getSong(idSong: string): Promise<any> {
    return firstValueFrom(
      this.httpClient.get<any>(`${URL_REQUEST.GET_SONG}/${idSong}`)
    );
  }

  getTopSongs(): Promise<any> {
    return firstValueFrom(this.httpClient.get<any>(URL_REQUEST.TOP_SONGS));
  }

  getArtistInfo(idArtist: string): Promise<any> {
    return firstValueFrom(
      this.httpClient.get<any>(`${URL_REQUEST.GET_ARTIST}/${idArtist}`)
    );
  }

  getArtistAlbums(idArtist: string): Promise<any> {
    return firstValueFrom(
      this.httpClient.get<any>(`${URL_REQUEST.GET_ARTIST_ALBUMS}/${idArtist}?limit=6`)
    );
  }

  getTopArtist(): Promise<any> {
    return firstValueFrom(this.httpClient.get<any>(URL_REQUEST.GET_ARTISTS));
  }

  getNewAlbums(): Promise<any> {
    return firstValueFrom(this.httpClient.get<any>(URL_REQUEST.NEW_ALBUMS));
  }

  getAlbumInfo(idAlbum: string): Promise<any> {
    return firstValueFrom(
      this.httpClient.get<any>(`${URL_REQUEST.GET_ALBUM}/${idAlbum}`)
    );
  }

  getGenres(): Promise<any> {
    return firstValueFrom(this.httpClient.get<any>(URL_REQUEST.GET_GENRES));
  }
}
