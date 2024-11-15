import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CardComponent } from '../../components/card/card.component';
import { FichaInscripcionService } from '../../service/ficha-inscripcion.service';
import { ActivatedRoute } from '@angular/router';
import { FichaInscripcionAsistentesResponse } from '../../interface/FichaInscripcionAsistentesResponse';

@Component({
  selector: 'app-asistencia',
  standalone: true,
  imports: [NavbarComponent,CardComponent],
  templateUrl: './asistencia.component.html',
  styleUrl: './asistencia.component.scss'
})
export default class AsistenciaComponent implements OnInit {

  _fichaInscripcionService = inject(FichaInscripcionService);
  _route = inject(ActivatedRoute);
  detalleFicha! : FichaInscripcionAsistentesResponse[];

  constructor(){
  }

  ngOnInit(): void {
    this.listarAsistentes();
  }

  listarAsistentes(){
    const id = this._route.snapshot.paramMap.get('id');

    this._fichaInscripcionService.getlistarAsistentes(id ?? "")
      .subscribe({
        next: (data: FichaInscripcionAsistentesResponse[]) => {
          this.detalleFicha = data;
         },
        error: (err) => {

        }
      });
  }

 }
