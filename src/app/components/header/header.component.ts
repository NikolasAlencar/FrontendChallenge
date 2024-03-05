import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CharactersService } from '../../services/characters.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, NgClass, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  characterService = inject(CharactersService);
  activeButton = 'home';

  handleButton = (nameButton: string) => (this.activeButton = nameButton);

  isActiveButton = (nameButton: string) =>
    this.activeButton === nameButton ? 'white' : 'black';
}
