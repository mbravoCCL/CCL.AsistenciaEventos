import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-asistencia',
  standalone: true,
  imports: [NavbarComponent,CardComponent],
  templateUrl: './asistencia.component.html',
  styleUrl: './asistencia.component.scss'
})
export default class AsistenciaComponent {
 }
