import { Component, Input } from '@angular/core';
import { EventoResponse } from '../../interface/EventoResponse';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  @Input() evento!: EventoResponse;

}
