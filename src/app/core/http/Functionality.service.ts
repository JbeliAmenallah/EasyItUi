import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Functionality } from '../../shared/models/functionality';


@Injectable({
  providedIn: 'root'
})
export class FunctionalityService {
  url: string = "http://localhost:8000"; 
  endpoint: string = 'functionalities';
  optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Acces-Control-Expose-Headers': '*',
      'Acces-Control-Allow-Methods': '*',
      'Acces-Control-Allow-Headers': '*',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  public create(functionality: Functionality): Observable<Functionality> {
    return this.httpClient.post<Functionality>(`${this.url}/${this.endpoint}`, functionality, this.optionRequete);
  }

  public update(functionality: Functionality): Observable<Functionality> {
    return this.httpClient.put<Functionality>(
      `${this.url}/${this.endpoint}/${functionality.id}`,
      functionality,
      this.optionRequete
    );
  }

  read(id: number): Observable<Functionality> {
    return this.httpClient.get<Functionality>(`${this.url}/${this.endpoint}/${id}`, this.optionRequete);
  }

  list(): Observable<Functionality[]> {
    return this.httpClient.get<Functionality[]>(`${this.url}/${this.endpoint}`, this.optionRequete);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${this.endpoint}/${id}`, this.optionRequete);
  }

  assignResourceToFunctionality(functionalityId: number, resourceId: number) {
    const url = `${this.url}/${this.endpoint}/${functionalityId}/resources/${resourceId}`;
    return this.httpClient.post(url, null);
}
}