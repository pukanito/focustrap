import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FocusTrap } from '@pukanito/focustrap';

@Component({
  selector: 'test-focustrap',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  focusTrapSwitch = new FormControl(false);

  @ViewChild('focusTrapContainer') private container!: ElementRef;

  private focusTrap: FocusTrap | null = null;

  ngOnInit(): void {
    this.focusTrapSwitch.valueChanges.subscribe((value) => {
      if (value) {
        this.focusTrap = new FocusTrap(this.container.nativeElement);
      } else {
        this.focusTrap?.uninstall();
        this.focusTrap = null;
      }
    });
  }
}
