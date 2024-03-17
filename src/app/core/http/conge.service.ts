import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conge } from '../../shared/models/conge'; // Update the path to your Conge model

@Injectable({
  providedIn: 'root'
})
export class CongeService {
  private apiUrl = 'http://localhost:8080/conges'; // Backend API URL

  constructor(private http: HttpClient) { }

  // Function to add a Conge
  addConge(conge: Conge): Observable<Conge> {
    return this.http.post<Conge>(this.apiUrl, conge);
  }
}
