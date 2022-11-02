import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AmortizationSchedule} from "../model/amortizationSchedule";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AmortizationScheduleService {
  private apiServiceUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient) {  }

  public getAmortizationScheduleByCalculationId(calculationId: number): Observable<AmortizationSchedule[]>{
    return this.http.get<AmortizationSchedule[]>(`${this.apiServiceUrl}/main/find/amortizationSchedule/${calculationId}`);
  }
}
