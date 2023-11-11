import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Focusable } from '@pukanito/focusable';

@Component({
  selector: 'test-focusable',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  focusOk: boolean = false;

  @ViewChild('focusableContainer') private focusableContainer!: ElementRef;

  ngAfterViewInit(): void {
    setTimeout(() => {
      const focus = new Focusable(this.focusableContainer.nativeElement);
      this.focusOk =
        focus.firstFocusable!.getAttribute('data-focus') === 'first-element' &&
        focus.lastFocusable!.getAttribute('data-focus') === 'last-element';
    }, 0);
  }
}
