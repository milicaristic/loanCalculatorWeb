import {Component, OnInit} from '@angular/core';
import {LoanRequest} from "./model/loanRequest";
import {LoanRequestService} from "./service/loanRequest.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AmortizationSchedule} from "./model/amortizationSchedule";
import {AmortizationScheduleService} from "./service/amortizationSchedule.service";
import {Calculation} from "./model/calculation";
import {CalculationService} from "./service/calculation.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public loanRequests: LoanRequest[] | undefined;
  public calculation: Calculation | undefined;
  public amortizationSchedule: AmortizationSchedule[] | undefined;

  constructor(private loanRequestService: LoanRequestService, private calculationService: CalculationService,
              private amortizationScheduleService: AmortizationScheduleService) {
  }

  ngOnInit(): void {
    this.getAmortizationSchedule(504);
  }

  public getLoanRequests(): void {
    this.loanRequestService.getLoanRequests().subscribe(
      (response: LoanRequest[]) => {
        this.loanRequests = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getCalculation(id: number): void {
    this.calculationService.getCalculationByLoanRequestId(id).subscribe(
      (response: Calculation) => {
        this.calculation=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getAmortizationSchedule(id: number): void {
    this.amortizationScheduleService.getAmortizationScheduleByCalculationId(id).subscribe(
      (response: AmortizationSchedule[]) => {
        this.amortizationSchedule = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
