import {Component, OnInit} from '@angular/core';
import {LoanRequest} from "../model/loanRequest";
import {Calculation} from "../model/calculation";
import {AmortizationSchedule} from "../model/amortizationSchedule";
import {LoanRequestService} from "../service/loanRequest.service";
import {CalculationService} from "../service/calculation.service";
import {AmortizationScheduleService} from "../service/amortizationSchedule.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  public loanRequest: LoanRequest;
  public loanRequests: LoanRequest[];
  public calculation: Calculation;
  public loanTermTypes: string[]=["year", "month"];
  public loanTermType: string="year";



  public calculated: boolean = false;

  constructor(private loanRequestService: LoanRequestService, private calculationService: CalculationService,
              private amortizationScheduleService: AmortizationScheduleService) {
  }

  ngOnInit(): void {
  }

  onSubmit(data) {
    if(this.loanTermType === "year"){
      let lr = this.convertToMonth(data.value);
      data.setValue(lr);
    }
    console.warn("data=",this.loanRequest);
    if (data != null) {
      this.addLoanRequest(data.value);
    }
  }

  public addLoanRequest(loanRequest: LoanRequest): void {
    this.loanRequestService.addLoanRequest(loanRequest).subscribe(
      (response: LoanRequest) => {
        console.log("response = ", response);
        if (response.loanAmount > 0 &&
          response.interestRate > 0 &&
          response.loanTerm > 0) {
          this.loanRequest = response;

          this.getCalculation(this.loanRequest.id);
        }
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
        //this.getAmortizationSchedule(this.calculation.id);
        this.calculated = true;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  private convertToMonth(loanRequest: LoanRequest) {

    console.log("loanRequest",loanRequest);
    loanRequest.loanTerm = loanRequest.loanTerm * 12;
    console.log("convertToMonth,  months= ", loanRequest.loanTerm);
    return loanRequest;
  }
}
