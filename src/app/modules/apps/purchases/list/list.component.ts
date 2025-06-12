import { Component } from '@angular/core';
import { IListColums, IMenu } from 'app/shared/components/list-base/list-base.types';
import { PurchasesService } from '../purchases.service';
import { PurchasesFormComponent } from '../form/form.component';
import { ActionsMenu, IMenuItems } from 'app/shared/components/models/menu-modal.interface';
import { PaymentsFormComponent } from '../../payments/form/form.component';
import { MatDialog } from '@angular/material/dialog';
import { PaymentsPurchaseFormComponent } from '../payment-purchase-form/payment-purchase-form.component';
import { PaymentModel } from '../../payments/payments.interface';
import { PurchasesDetailModel } from '../purchases.interface';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent {
  constructor(private _crudService: PurchasesService, public _dialog: MatDialog) { }
  crudService = this._crudService
  optionsColumns: string[] = ['Editar', 'Eliminar', 'Pagar'];

  columns: IListColums[] = [
    { 
      'name': 'ID',
      'code': 'id',
      'show': true,
    },
    {      
      'name': 'Tipo Documento',
      'code': 'tipoDocumento',
      'show': true,
    },
    {      
      'name': 'Nro Documento',
      'code': 'numero_documento',
      'show': true,
    },
    {      
      'name': 'Proveedor',
      'code': 'proveedorName',
      'show': true,
    },
    {
      'name': 'Moneda',
      'code': 'monedaDivisa',
      'show': true,
    },
    {
      'name': 'Total',
      'code': 'total',
      'show': true,
    },
    {
      'name': 'Saldo',
      'code': 'saldo',
      'show': true,
    },
    {
      'name': 'Pagado',
      'code': 'pagado',
      'show': true,
    },
    {
      'name': 'Fecha Documento',
      'code': 'fecha_documento',
      'show': false,
    },
    {
      'name': 'Fecha Vencimiento',
      'code': 'fecha_vencimiento',
      'show': false
    },

  ]

  // Configuración de acciones del menú
  menuItems: IMenuItems[] = [
      {
        title: 'Editar',
        icon: 'edit', 
        label: 'Editar', 
        actions: ActionsMenu.EDIT
      },
      {
        title: 'Eliminar',
        icon: 'delete',
        label: 'eliminar',
        actions: ActionsMenu.DELETE},
      {
        title: 'Pagar',
        icon: 'payments',
        label: 'pagar',
        actions: 'PAGAR'}
    ];

  // Método para manejar la acción de "Registrar Pago"
  onMenuClick(event: { row: PurchasesDetailModel; menuItem: IMenuItems }): void {
    console.log('Lmame:', event);
    if (event.menuItem.actions === 'PAGAR') {
      console.log('Registrar Pago:', event.row);
      this.crudService.oneItem.next(event.row);
      this.openPaymentForm(event.row);
    }
  }

  openPaymentForm(row: any): void {
    const dialogRef = this._dialog.open(PaymentsPurchaseFormComponent, {
      width: '750px',
      data: { purchaseId: row.id }, // Pasar el ID de la compra al formulario
    });
  

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Pago registrado:', result);
        // Refrescar la lista si es necesario
        this.crudService.getList().subscribe((data) => {
          console.log('Lista actualizada:', data);
        });
      }
    });
  }
  
  modal = PurchasesFormComponent
}
