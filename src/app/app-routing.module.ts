import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component'
import { AmortizationScheduleComponent } from './amortization-schedule/amortization-schedule.component';

const routes: Routes = [
  {path: "", component: CalculatorComponent},
  { path: "amortization-schedule/:id", component: AmortizationScheduleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
