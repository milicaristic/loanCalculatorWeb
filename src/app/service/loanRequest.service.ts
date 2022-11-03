import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoanRequest} from "../model/loanRequest";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoanRequestService {
  private apiServiceUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient) {  }

  public getLoanRequests(): Observable<LoanRequest[]>{
    return this.http.get<LoanRequest[]>(`${this.apiServiceUrl}/loanRequest/all`);
  }

  public getLoanRequestById(id: number): Observable<LoanRequest>{
    return this.http.get<LoanRequest>(`${this.apiServiceUrl}/loanRequest/find/${id}`);
  }

  public addLoanRequest(loanRequest: LoanRequest): Observable<LoanRequest>{
    return this.http.post<LoanRequest>(`${this.apiServiceUrl}/main/add`, loanRequest);
  }
}
