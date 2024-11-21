import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CardComponent } from '../../components/card/card.component';
import { FichaInscripcionService } from '../../service/ficha-inscripcion.service';
import { ActivatedRoute } from '@angular/router';
import { FichaInscripcionAsistentesResponse } from '../../interface/FichaInscripcionAsistentesResponse';
import { BehaviorSubject, distinctUntilChanged, interval, Observable, startWith, Subscription, switchMap, tap, timer } from 'rxjs';
import { EventoService } from '../../service/evento.service';
import { EventoResponse } from '../../interface/EventoResponse';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-asistencia',
  standalone: true,
  imports: [NavbarComponent,CardComponent, FooterComponent],
  templateUrl: './asistencia.component.html',
  styleUrl: './asistencia.component.scss'
})
export default class AsistenciaComponent implements OnInit, OnDestroy {
  private subscription: Subscription | null = null;
  public currentPage = 1;
  public pageSize = 6;
  public lastTotalResultados = 0;

  _fichaInscripcionService = inject(FichaInscripcionService);
  _eventoService = inject(EventoService);
  _route = inject(ActivatedRoute);
  detalleFicha!: FichaInscripcionAsistentesResponse[];
  idEvento: string = '';
  evento!: EventoResponse;

  constructor() {}

  ngOnInit(): void {
    this.idEvento = this._route.snapshot.paramMap.get('id') ?? '';
    this.ObtenerEvento();
    this.startPaginationFlow();
  }

  private startPaginationFlow(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = new Observable<void>((observer) => {
      this.listarAsistentes(); 
      observer.next(); 
    }).pipe(
      switchMap(() => interval(30000))
    ).subscribe(() => {
      this.listarAsistentes();
    });
  }

  listarAsistentes(): void {
    this._fichaInscripcionService
      .getlistarAsistentes(this.idEvento, this.currentPage, this.pageSize)
      .subscribe({
        next: (data: FichaInscripcionAsistentesResponse[]) => {
          
          if (data.length === 0) {
            this.currentPage = 1;
            this.listarAsistentes()
          } else {
            this.detalleFicha = data;
            const total = data[0].totalResultados || 0;

            if (total !== this.lastTotalResultados) {
              this.currentPage = 1; 
              this.listarAsistentes();
            } else {
              this.currentPage++;
            }

            this.lastTotalResultados = total;
          }
        },
        error: (err) => {
          console.error('Error al listar asistentes', err);
        },
      });
  }

  ObtenerEvento(): void {
    this._eventoService.obtener(this.idEvento).subscribe({
      next: (data: EventoResponse) => {
        this.evento = data;
      },
      error: (err) => {
        console.error('Error al obtener evento', err);
      }
    });
  }

  


  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
