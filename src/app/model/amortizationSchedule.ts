export interface AmortizationSchedule{
  id: number,
  month: number,
  paymentAmount: number,
  principalAmount: number,
  interestAmount: number,
  balanceOwned: number,
  calculationId: number
}
