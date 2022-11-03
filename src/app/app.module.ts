import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { CalculatorComponent } from './calculator/calculator.component';
import { FormsModule } from "@angular/forms";
import {CommonModule} from '@angular/common';
import { AmortizationScheduleComponent } from './amortization-schedule/amortization-schedule.component';


@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    AmortizationScheduleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
