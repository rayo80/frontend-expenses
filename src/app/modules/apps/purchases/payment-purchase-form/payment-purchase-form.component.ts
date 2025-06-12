
// Removed unused import
import { SuppliersService } from './../../suppliers/suppliers.service';
import { Component, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

// Removed unused import
import { SupplierModel } from '../../suppliers/suppliers.interface';
// Removed unused import
import { ProductsService } from '../../productos/productos.service';
import { ProductModel } from '../../productos/productos.interface';
import { Observable, tap, filter, switchMap, takeUntil, Subject, map } from 'rxjs';
import { MonedasService } from '../../monedas/monedas.service';
import { MonedaModel } from '../../monedas/monedas.interface';
// Removed unused import
import { PurchasesModel } from '../../purchases/purchases.interface';
import { PurchasesService } from '../../purchases/purchases.service';
import { ConstantsModel } from '../../payment_methods/payment_methods.interface';
import { PaymentMethodsService } from '../../payment_methods/payment_methods.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PaymentsService } from '../../payments/payments.service';
import { PaymentModel } from '../../payments/payments.interface';
import { CajaCentralService } from '../../caja_central/caja_central.service';
import { CentralModel } from '../../caja_central/caja_central.interface';
// Removed unused import


@Component({
  selector: 'app-payment-purchase-form',
  templateUrl: './payment-purchase-form.component.html',
  styleUrls: ['./payment-purchase-form.component.scss']
})
export class PaymentsPurchaseFormComponent {

    hasDetroyed$ = new Subject<boolean>();

    constructor(
        private fbuild:FormBuilder,
        private principalService: PurchasesService,
        private monedasService: MonedasService,
        private paymentMethodsServices: PaymentMethodsService,
        private paymentsServices: PaymentsService,
        private centralsServices: CajaCentralService,
        public dialogRef:MatDialogRef<PaymentsPurchaseFormComponent>) { }


    formInstance:FormGroup;
    instanceToEdit:PurchasesModel;
    error=false;

    suppliers:SupplierModel[]
    products:ProductModel[]
    monedas:MonedaModel[]
    compras:PurchasesModel[]
    metodos:ConstantsModel[]
    centrales:CentralModel[]
    tipoOperacion: number = 1;

    @Output() refreshTable:boolean = false;
    itemsTableForm: PaymentModel
    
      
    @ViewChild(MatTable) table: MatTable<PaymentModel[]>;
    dataSource = new MatTableDataSource<PaymentModel>();
    displayedColumns: string[] = ["fecha", "metodo", "metodo", "moneda", "total"];


    getElementEdit(){

      return this.principalService.oneItem.subscribe(
        val=>{
            this.instanceToEdit = val;
        }
      )
    }

    getMonedas(){
        this.monedasService.getListCache()
        .pipe(takeUntil(this.hasDetroyed$))
        .subscribe(
        (val) => this.monedas = val  
        )
    }


  getMethods(){
    this.paymentMethodsServices.getListCache()
      .pipe(takeUntil(this.hasDetroyed$))
      .subscribe(
        (val) => this.metodos = val  
      )
  }

  getCentrals(){
    this.centralsServices.getListCache()
      .pipe(takeUntil(this.hasDetroyed$))
      .subscribe(
        (val) => this.centrales = val  
      )
  }

  getPayments(){
    this.paymentsServices.getListCache()
    .pipe(
      takeUntil(this.hasDetroyed$),
      map((items) => items.filter(item => item.compra.id === this.instanceToEdit.id)),
    )
    .subscribe(
      (val) => this.dataSource.data = val
    )
  }
  
  ngOnInit(): void {
    this.getMonedas()
    this.getMethods()
    this.getCentrals()
    this.formInstance = this.fbuild.group({
      compra: [null],
      referencia: ['', [Validators.required]],
      moneda: ['', [Validators.required]],
      metodo: ['', [Validators.required]],
      total: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      hora: ['', Validators.required],
      cargo: [null],
      })

    this.getElementEdit();
    this.getPayments();
  }

  refreshTables() {

  }


  onSubmit() {
    if (this.formInstance.status !== 'INVALID') {
      if (!this.instanceToEdit) {
        confirm('No se ha encontrado la compra');
        return;
      }

      const formData = this.formInstance.value;
      const fechaCompleta = new Date(formData.fecha); // Convertir la fecha a un objeto Date
      const [hours, minutes] = formData.hora.split(':'); // Dividir la hora en horas y minutos
      fechaCompleta.setHours(hours, minutes); // Establecer las horas y minutos en la fecha
  
      const paymentData: PaymentModel = {
        ...this.formInstance.value,
        compra: this.instanceToEdit.id,
        fecha: fechaCompleta.toISOString(),
      };

      this.paymentsServices.createItem(paymentData).subscribe({
        next: (response) => {
          console.log('Response:', response);
          this.dataSource.data = [...this.dataSource.data, response]; // Refresh the table by adding the new payment directly
          this.formInstance.reset();
          
           // Reset the form after successful submission  confirm('Pago registrado correctamente');
        },
        error: (err) => {
          console.error('Error al registrar el pago:', err);
          confirm('Ocurrió un error al registrar el pago');
        },
      });
    } else {
      this.error = true;
    }
  }
  
    
  ngOnDestroy(): void {
    this.hasDetroyed$.next(true);
    this.hasDetroyed$.complete();
  }
}

