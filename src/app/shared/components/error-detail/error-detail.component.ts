import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-detail.component.html',
  styles: []
})
export class ErrorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string },
  public dialogRef:MatDialogRef<ErrorDialogComponent>
) {}

  onClose(): void {
    // close logic
    this.dialogRef.close()
  }
}