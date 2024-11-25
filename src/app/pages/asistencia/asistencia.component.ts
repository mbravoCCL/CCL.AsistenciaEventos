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
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';

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
  nuevos:boolean = false;
  private audio!: HTMLAudioElement;
  readonly dialog = inject(MatDialog);
  autorizoSonido :boolean = true;
  previousPage: number = 0;

  constructor(){
    this.audio = new Audio('sound.mp3');
  }

  
  playSound(): void {
    this.audio.play(); 
  }

  ngOnInit(): void {
    this.idEvento = this._route.snapshot.paramMap.get('id') ?? '';
    this.openDialog();

  }

  private startPaginationFlow(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = new Observable<void>((observer) => {
      this.listarAsistentes(); 
      observer.next(); 
    }).pipe(
      switchMap(() => interval(60000))
    ).subscribe(() => {
     
      if(this.previousPage>1){
        this.currentPage = this.previousPage;
        this.previousPage = 0;
        this.listarAsistentes();
      }else{
        this.listarAsistentes();    
      }
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
              this.previousPage = this.currentPage;
              this.currentPage = 1;
              if(this.autorizoSonido){
                this.playSound() 
              }
          
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

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
    
      if (result) {
        this.autorizoSonido = true;
        this.ObtenerEvento();
        this.startPaginationFlow();
        this.playSound();
      } else {
        this.autorizoSonido = false;
        this.ObtenerEvento();
        this.startPaginationFlow();
      }
    });
  }


  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
