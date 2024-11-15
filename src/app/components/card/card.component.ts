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
  vCardDownloadUrl: string = 'https://personal.camaralima.org.pe/tarjetavirtual.php?CCL=JHONATAN-MEDINA-GERENCIA-DE-INNOVACION-Y-TECNOLOGIAS-DE-LA-INFORMACION&DNI=46519359&l=e';
  @Input() detalleFicha!: FichaInscripcionAsistentesResponse[];
  
}
