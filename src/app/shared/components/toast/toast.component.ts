import { NgClass } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { IToast } from '@shared/interfaces/toast.interface';

@Component({
    selector: 'app-toast',
    imports: [NgClass],
    templateUrl: './toast.component.html',
    styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnChanges {
  @Input({ required: true }) data!: IToast;

  ngOnChanges(changes: any): void {
    const newData: IToast = changes?.data?.currentValue;
    if (newData.isOpen) {
      setTimeout(() => {
        this.closeToast();
      }, newData?.time ?? 5000);
    }
  }

  closeToast() {
    this.data.isOpen = false;
  }
}
