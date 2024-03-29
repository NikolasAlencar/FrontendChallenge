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
  pagePagination = 0;

  getCharactersByPage() {
    if (this.pagePagination > 42) return this.loadingPagination.set(false);

    this.httpClient
      .get<Response>(
        `${this.BACKEND_URL}character/?page=${this.pagePagination}`
      )
      .pipe(map((res) => res.results))
      .subscribe((characters) => {
        this.setFavorite(characters);
        if (this.pagePagination > 0) {
          this.characters.update(oldValue => [...oldValue, ...characters]);
          this.loadingPagination.set(false);
        } else {
          this.characters.set(characters);
        }
        this.pagePagination += 2;
      });
  }

  removeFavorite(character: Character) {
    const index = this.favoriteCharacters().findIndex(
      (oldCharacter) => character.id === oldCharacter.id
    );
    this.favoriteCharacters().splice(index, 1);
  }

  addFavorite = (character: Character) => this.favoriteCharacters().push(character);

  setFavorite(character: Characters) {
    const idFavorite = this.favoriteCharacters().map(
      (character) => character.id
    );
    character.forEach((character) => {
      if (idFavorite.includes(character.id)) {
        character.favorite = true;
      }
    });
  }

  getCharacters = () => this.characters;

  getLoadingPagination = () => this.loadingPagination;

  getFavoriteCharacters = () => this.favoriteCharacters;
}
