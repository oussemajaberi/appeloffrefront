import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { Offre } from '../model/Offre';

@Injectable({
  providedIn: 'root'
})
export class OffreServiceService {
  private apiUrl = 'http://localhost:8086/offre/add';

  constructor(private http: HttpClient, private keycloakService: KeycloakService) { }

  createOffre(offre: any): Observable<Offre> {
    const createdBy = this.keycloakService.getKeycloakInstance().subject;
    console.log(createdBy);
    const url = `${this.apiUrl}/${createdBy}`;
    return this.http.post<Offre>(url, offre);
  }
  getTagSuggestions(tagPrefix: string): Observable<string[]> {
    const url = `http://localhost:8086/tags/suggestions?tagPrefix=${tagPrefix}`;
    return this.http.get<string[]>(url);
  }
}
