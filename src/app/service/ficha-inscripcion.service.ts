import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

import { Observable } from 'rxjs';
import { FichaInscripcionAsistentesResponse } from '../interface/FichaInscripcionAsistentesResponse';
import { HttpClient } from '@angular/common/http';

const urlApi = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class FichaInscripcionService {
  
  http = inject(HttpClient);

  constructor() {}

  getlistarAsistentes(id: string): Observable<FichaInscripcionAsistentesResponse[]> {
    return this.http.get<FichaInscripcionAsistentesResponse[]>(`https://localhost:7024/api/FichaInscripcion/listarAsistentes/${id}`);
  }
}
