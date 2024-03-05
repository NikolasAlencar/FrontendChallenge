import { Component, HostListener, Input, inject, signal } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { ajustaGrid } from '../../../assets/util/AjustaGrid';
import { NgClass, NgStyle } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { SkeletonComponent } from '../../components/skeleton/skeleton.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { Character, Characters } from '../../services/model/Character';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [
    MatGridListModule,
    SkeletonComponent,
    NgClass,
    LoaderComponent,
    TruncatePipe,
    NgStyle,
    MatIconModule,
  ],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss',
})
export class CharacterListComponent {
  @Input({ required: true }) characters!: Characters;
  @Input() seeMore?: boolean;

  charactersService = inject(CharactersService);

  screenWidth = signal(window.innerWidth / 9);
  innerWidth = signal(ajustaGrid(window.innerWidth));

  loadingPagination = this.charactersService.getLoadingPagination();
  pagePagination = 0;

  favorite(character: Character) {
    character.favorite = !character.favorite;
    character.favorite
      ? this.charactersService.addFavorite(character)
      : this.charactersService.removeFavorite(character);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth.set(window.innerWidth / 9);
    this.innerWidth.set(ajustaGrid(window.innerWidth));
  }
}
