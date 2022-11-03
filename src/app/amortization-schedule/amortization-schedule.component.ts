import {Component, Input, OnInit} from '@angular/core';
import {AmortizationSchedule} from "../model/amortizationSchedule";
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {AmortizationScheduleService} from "../service/amortizationSchedule.service";
import {CalculationService} from "../service/calculation.service";
import {LoanRequestService} from "../service/loanRequest.service";
import {Calculation} from "../model/calculation";
import {LoanRequest} from "../model/loanRequest";

@Component({
  selector: 'app-amortization-schedule',
  templateUrl: './amortization-schedule.component.html',
  styleUrls: ['./amortization-schedule.component.scss']
})
export class AmortizationScheduleComponent implements OnInit{
  public amortizationSchedule: AmortizationSchedule[];
  public calculationId: number;
  public calculation: Calculation;
  public loanRequest: LoanRequest;

  constructor(private route: ActivatedRoute,
              private amortizationScheduleService: AmortizationScheduleService,
              private calculationService: CalculationService,
              private loanAmountService: LoanRequestService) {

    this.route.params.subscribe(params => {
      this.calculationId = params['id'];
      console.log("calc. id: ", this.calculationId);
    });
  }


  ngOnInit(): void {
    this.getLoanRequest(this.calculationId);
    this.getCalculation(this.calculationId);
    this.getAmortizationSchedule(this.calculationId);
    console.log("oninit: ", this.loanRequest);
  }

  public getAmortizationSchedule(id: number): void {
    this.amortizationScheduleService.getAmortizationScheduleByCalculationId(id).subscribe(
      (response: AmortizationSchedule[]) => {
        this.amortizationSchedule = response;
        this.amortizationSchedule.sort((as1: AmortizationSchedule, as2: AmortizationSchedule) =>{
          if(as1.month > as2.month){
            return 1;
          }
          if(as1.month < as2.month){
            return -1;
          }
          return 0;
        })
        console.log("amortization schedule = " , this.amortizationSchedule)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getCalculation(id: number): void {
    this.calculationService.getCalculationByLoanRequestId(id).subscribe(
      (response: Calculation) => {
        this.calculation = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getLoanRequest(id: number): void {
    this.loanAmountService.getLoanRequestById(id).subscribe(
      (response: LoanRequest) => {
        this.loanRequest = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
