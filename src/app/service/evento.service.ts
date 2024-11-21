import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventoResponse } from '../interface/EventoResponse';
import { environment } from '../../environments/environment.development';

const urlApi = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class EventoService {
  
  http = inject(HttpClient);

  constructor() {}

  obtener(id: string): Observable<EventoResponse> {
    return this.http.get<EventoResponse>(`${urlApi}/evento/obtener/${id}`);
  }
}
