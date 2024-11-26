import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHoverColor]',
})
export class HoverColorDirective {
  @Input() defaultColor: string = 'black';
  @Input() hoverColor: string = 'orange';

  constructor(private el: ElementRef) {
    this.setColor(this.defaultColor);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setColor(this.hoverColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setColor(this.defaultColor);
  }

  private setColor(color: string) {
    this.el.nativeElement.style.color = color;
  }
}
