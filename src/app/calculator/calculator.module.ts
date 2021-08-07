import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculatorContainerComponent } from './containers/calculator-container/calculator-container.component';
import { CalculatorComponent } from './components/calculator/calculator.component';

@NgModule({
  declarations: [
    CalculatorContainerComponent,
    CalculatorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CalculatorContainerComponent
  ]
})
export class CalculatorModule { }
