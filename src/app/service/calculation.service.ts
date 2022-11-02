import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Calculation} from "../model/calculation";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CalculationService {
  private apiServiceUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient) {  }

  public getCalculationByLoanRequestId(loanRequestId: number): Observable<Calculation>{
    return this.http.get<Calculation>(`${this.apiServiceUrl}/main/findCalculation/${loanRequestId}`);
  }
}
