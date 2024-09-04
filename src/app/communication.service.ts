import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment.prod";
export const API_ENDPOINT = environment.APP_API_ENDPOINT;

export interface ComtradeInfo{
  name: string;
  values: Array<number>
  times: Array<number>
  type: string;
  clicked: boolean;
  rms: Array<number>
}
export interface FaultCurrentInfo{
  name: string;
  value: number;
  time: number;
  indexOfValues: number
}
export interface Current{
  name: string;
  value: number
}
@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private http: HttpClient) { }

  getCurrent(): Observable<Current[]> {
    return this.http.get<Current[]>(`${API_ENDPOINT}current`);
  }

  getScopes(): Observable<ComtradeInfo[]> {
    return this.http.get<ComtradeInfo[]>(`${API_ENDPOINT}scopes`);
  }

  getFaultCurrentInfoA1(): Observable<FaultCurrentInfo[]> {
    return this.http.get<FaultCurrentInfo[]>(`${API_ENDPOINT}a1`);
  }
  getFaultCurrentInfoB1(): Observable<FaultCurrentInfo[]> {
    return this.http.get<FaultCurrentInfo[]>(`${API_ENDPOINT}b1`);
  }
  getFaultCurrentInfoC1(): Observable<FaultCurrentInfo[]> {
    return this.http.get<FaultCurrentInfo[]>(`${API_ENDPOINT}c1`);
  }
  getFaultCurrentInfoA2(): Observable<FaultCurrentInfo[]> {
    return this.http.get<FaultCurrentInfo[]>(`${API_ENDPOINT}a2`);
  }
  getFaultCurrentInfoB2(): Observable<FaultCurrentInfo[]> {
    return this.http.get<FaultCurrentInfo[]>(`${API_ENDPOINT}b2`);
  }
  getFaultCurrentInfoC2(): Observable<FaultCurrentInfo[]> {
    return this.http.get<FaultCurrentInfo[]>(`${API_ENDPOINT}c2`);
  }
  getFaultCurrentInfoA3(): Observable<FaultCurrentInfo[]> {
    return this.http.get<FaultCurrentInfo[]>(`${API_ENDPOINT}a3`);
  }
  getFaultCurrentInfoB3(): Observable<FaultCurrentInfo[]> {
    return this.http.get<FaultCurrentInfo[]>(`${API_ENDPOINT}b3`);
  }
  getFaultCurrentInfoC3(): Observable<FaultCurrentInfo[]> {
    return this.http.get<FaultCurrentInfo[]>(`${API_ENDPOINT}c3`);
  }
}
