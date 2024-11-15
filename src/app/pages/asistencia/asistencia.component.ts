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

    this.detalleFicha = [
      {
        "fullname": "Andrea Hualtibamba Almiron",
        "empresa": "RESSIDIR INVERSIONES INMOBILIARIAS S.A.C."
      },
      {
        "fullname": "Melissa Damian Moreno",
        "empresa": "RESSIDIR INVERSIONES INMOBILIARIAS S.A.C."
      },
      {
        "fullname": "MANUEL OMAR ORTIZ HURTADO",
        "empresa": "MITOLOGIA CAFE E.I.R.L."
      },
      {
        "fullname": "Yenzo Adhir Gomez Acosta",
        "empresa": "AURUS CONSTRUCTORA E INMOBILIARIA S.A.C."
      },
      {
        "fullname": "JOSÉ LUIS JR SAMAME GONZALES",
        "empresa": "OL & AS CONTRATISTAS GENERALES S.R.L."
      },
      {
        "fullname": "JORDAN LOPEZ SANDOVAL",
        "empresa": "GENERAL MACHINING S.A.C"
      }
    ]
  }

 }
