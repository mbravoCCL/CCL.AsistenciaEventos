import { CommonModule, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faBriefcase , faBuilding } from '@fortawesome/free-solid-svg-icons';
import { QRCodeModule } from 'angularx-qrcode';
import { FichaInscripcionAsistentesResponse } from '../../interface/FichaInscripcionAsistentesResponse';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [FontAwesomeModule,NgClass,CommonModule,QRCodeModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  faUser = faUser;
  faBuilding = faBuilding;
 faBriefcase = faBriefcase;
  @Input() detalleFicha!: FichaInscripcionAsistentesResponse[];
  

}


