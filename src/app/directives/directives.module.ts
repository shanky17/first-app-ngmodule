import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverColorDirective } from './hoverColor/hover-color.directive';

@NgModule({
  declarations: [HoverColorDirective],
  imports: [CommonModule],
  exports: [HoverColorDirective],
})
export class DirectivesModule {}
