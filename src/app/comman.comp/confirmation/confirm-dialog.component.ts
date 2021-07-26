import { Component, OnInit, ChangeDetectionStrategy, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-confirmation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    cancelText: string,
    confirmText: string,
    message: string,
    title: string
  }, private mdDialogRef: MatDialogRef<ConfirmDialogComponent>) { }

  public cancel() {
    this.close(false);
  }
  
  public close(value: boolean) {
    this.mdDialogRef.close(value);
  }

  public confirm() {
    this.close(true);
  }
  
  @HostListener("keydown.esc")
  public onEsc() {
    this.close(false);
  }

}
