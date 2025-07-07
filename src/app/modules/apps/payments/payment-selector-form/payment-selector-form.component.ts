import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PaymentsSimpleFormComponent } from '../payment_simple_form/payment_simple_form.component';
import { PaymentsDetailFormComponent } from '../payment_detail_form/payment_detail_form.component';

@Component({
  selector: 'app-payment-selector-form',
  templateUrl: './payment-selector-form.component.html',
})
export class PaymentSelectorComponent {
  isCompra = true;  // por defecto

  constructor(
    public dialogRef: MatDialogRef<PaymentSelectorComponent>,
    private dialog: MatDialog
  ) {}

  onSelect(value: boolean) {
    this.dialogRef.close(); // Cerrar este modal

    if (value) {
      this.dialog.open(PaymentsSimpleFormComponent, { autoFocus: false });
    } else {
      this.dialog.open(PaymentsDetailFormComponent, { autoFocus: false });
    }
  }

}