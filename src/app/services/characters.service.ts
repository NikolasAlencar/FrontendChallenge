import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map } from 'rxjs';
import { Response } from './model/Response';
import { Character, Characters } from './model/Character';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  BACKEND_URL = environment.CHARACTERS_API_URL;
  httpClient = inject(HttpClient);
  characters: WritableSignal<Characters> = signal([]);
  loadingPagination: WritableSignal<Boolean> = signal(false);
  favoriteCharacters: WritableSignal<Characters> = signal([]);
  // findCharacters: WritableSignal<Characters> = signal([]);

  getCharactersByPage(page: number) {
    if (page > 42) return this.loadingPagination.set(false);
    this.httpClient
      .get<Response>(`${this.BACKEND_URL}character/?page=${page}`)
      .pipe(map((res) => res.results))
      .subscribe((characters) => {
        if (page > 0) {
          this.characters.set(this.characters().concat(characters));
          this.loadingPagination.set(false);
        } else {
          this.characters.set(characters);
        }
      });
  }

  removeFavorite(character: Character) {
    const index = this.favoriteCharacters().findIndex(
      (oldCharacter) => character.id === oldCharacter.id
    );
    this.favoriteCharacters().splice(index, 1);
  }

  addFavorite = (character: Character) => this.favoriteCharacters().push(character);

  // getCharactersByName(name: string) {
  //   this.httpClient
  //     .get<Response>(`${this.BACKEND_URL}character/?page=${page}`)
  //     .pipe(map(res => res.results))
  //     .subscribe(characters => this.findCharacters.set(characters));
  // }

  getCharacters = () => this.characters;

  getLoadingPagination = () => this.loadingPagination;

  getFavoriteCharacters = () => this.favoriteCharacters;
}
