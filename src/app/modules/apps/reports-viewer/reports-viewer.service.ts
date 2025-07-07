import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportViewerService {
  apiUrl = environment.url+'/api/reportes'

  constructor(private http: HttpClient) {}

  getReport(tipo: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}?tipo=${tipo}`, { responseType: 'blob' });
  }
}