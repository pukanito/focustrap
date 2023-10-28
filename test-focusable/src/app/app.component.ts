import { AfterViewInit, Component } from '@angular/core';
import { Focusable } from '@pukanito/focusable';

@Component({
  selector: 'test-focusable',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  focusOk: boolean = false;
  ngAfterViewInit(): void {
    const focus = Focusable(
      document.querySelector('.focus-container') as HTMLElement
    );
    this.focusOk =
      focus.firstFocusable!.getAttribute('data-focus') === 'first-element' &&
      focus.lastFocusable!.getAttribute('data-focus') === 'last-element';
  }
}
