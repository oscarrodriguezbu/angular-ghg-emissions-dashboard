import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emission } from '../interfaces/emission.interface';

@Injectable({ providedIn: 'root' })
export class EmissionsService {

  private readonly url = 'data/emissions.json';

  constructor(private readonly http: HttpClient) { }

  getEmissions(): Observable<Emission[]> {
    return this.http.get<Emission[]>(this.url);
  }
}
