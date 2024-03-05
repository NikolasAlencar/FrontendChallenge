import { Component, HostListener, OnInit, inject, signal } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CharactersService } from '../../services/characters.service';
import { NgStyle } from '@angular/common';
import { CharacterListComponent } from '../../components/character-list/character-list.component';
import { MatInputModule } from '@angular/material/input';
import { FeedbackComponent } from '../../components/feedback/feedback.component';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  startWith,
} from 'rxjs';
import { Characters } from '../../services/model/Character';
import { toObservable } from '@angular/core/rxjs-interop';
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
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.charactersService.getCharactersByPage(this.pagePagination);
    this.searchCharacter.valueChanges
      .pipe(startWith(''), distinctUntilChanged(), debounceTime(500))
      .subscribe((value) => console.log(value));
  }

  searchCharacter = new FormControl('');
  filteredCharacters$ = new Observable<Characters>();

  charactersService = inject(CharactersService);
  characters = toObservable(this.charactersService.getCharacters());

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
