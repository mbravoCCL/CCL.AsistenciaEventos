import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

import { map, Observable } from 'rxjs';
import { FichaInscripcionAsistentesResponse } from '../interface/FichaInscripcionAsistentesResponse';
import { HttpClient } from '@angular/common/http';

const urlApi = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class FichaInscripcionService {
  
  http = inject(HttpClient);

  constructor() {}

  getlistarAsistentes(idEvento: string, pageNumber: number, pageSize:number): Observable<FichaInscripcionAsistentesResponse[]> {
    return this.http.get<FichaInscripcionAsistentesResponse[]>
    (`${urlApi}/FichaInscripcion/listarAsistentesPaginadoPorEvento/${idEvento}/${pageNumber}/${pageSize}`)
    .pipe(
      map((response: FichaInscripcionAsistentesResponse[]) => {
        return response.map(item => {
        
          return {
            ...item,
            urlVcard: `${urlApi}/Contact/downloadVcard/${item.new_Participante}/${idEvento}`
          };
        });
      })
    );
}
}
