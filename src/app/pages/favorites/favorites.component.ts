import { NgStyle } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormField } from '@angular/material/form-field';
import { CharactersService } from '../../services/characters.service';
import { CharacterListComponent } from '../../components/character-list/character-list.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    NgStyle,
    TitleComponent,
    MatGridListModule,
    MatFormField,
    CharacterListComponent,
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  charactersService = inject(CharactersService);
  characters = this.charactersService.getFavoriteCharacters();

  screenWidth = signal(window.innerWidth / 9);

  loadingPagination = this.charactersService.getLoadingPagination();
  pagePagination = 0;

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth.set(window.innerWidth / 9);
  }
}
