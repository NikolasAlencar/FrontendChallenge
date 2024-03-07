import {
  Component,
  HostListener,
  Injector,
  OnInit,
  effect,
  inject,
  signal,
} from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CharactersService } from '../../services/characters.service';
import { NgStyle } from '@angular/common';
import { CharacterListComponent } from '../../components/character-list/character-list.component';
import { MatInputModule } from '@angular/material/input';
import { FeedbackComponent } from '../../components/feedback/feedback.component';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import { Characters } from '../../services/model/Character';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TitleComponent,
    MatFormFieldModule,
    NgStyle,
    CharacterListComponent,
    MatInputModule,
    FeedbackComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(){
    this.charactersService.getCharactersByPage();
    this.searchCharacter.valueChanges
      .pipe(startWith(''), distinctUntilChanged(), debounceTime(500))
      .subscribe(
        (userInput) =>
          (this.filteredCharacters = this.filteredItems(userInput as string))
      );

    effect(() => this.filteredCharacters = this.characters());
  }

  searchCharacter = new FormControl('');

  injector = inject(Injector);

  charactersService = inject(CharactersService);
  characters = this.charactersService.getCharacters();

  filteredCharacters: Characters = [];

  screenWidth = signal(window.innerWidth / 9);

  loadingPagination = this.charactersService.getLoadingPagination();

  filteredItems = (userInput: string) =>
    this.characters().filter((character) =>
      character.name.toLowerCase().includes(userInput.toLowerCase())
    );

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth.set(window.innerWidth / 9);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (this.isScrolledToBottom()) {
      this.loadingPagination.set(true);
      this.charactersService.getCharactersByPage();
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
