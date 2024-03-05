import { Component, HostListener, inject, signal } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl } from '@angular/forms';
import { CharactersService } from '../../services/characters.service';
import { NgStyle } from '@angular/common';
import { CharacterListComponent } from '../../components/character-list/character-list.component';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TitleComponent,
    MatFormFieldModule,
    NgStyle,
    CharacterListComponent,
    MatInputModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor() {
    this.charactersService.getCharactersByPage(this.pagePagination);
  }

  nomeFormControl = new FormControl('');

  charactersService = inject(CharactersService);
  characters = this.charactersService.getCharacters();

  screenWidth = signal(window.innerWidth / 9);

  loadingPagination = this.charactersService.getLoadingPagination();
  pagePagination = 0;

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth.set(window.innerWidth / 9);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (this.isScrolledToBottom()) {
      this.loadingPagination.set(true);
      this.pagePagination += 20;
      this.charactersService.getCharactersByPage(this.pagePagination);
    }
  }

  isScrolledToBottom(): boolean {
    const windowHeight = window.innerHeight;
    const scrollY =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight;

    return scrollY + windowHeight >= documentHeight;
  }
}
