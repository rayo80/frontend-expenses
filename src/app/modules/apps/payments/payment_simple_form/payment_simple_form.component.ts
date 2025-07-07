
// Removed unused import
import { SuppliersService } from '../../suppliers/suppliers.service';
import { Component, Output } from '@angular/core';
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
import { PaymentModel } from '../payments.interface';
import { PaymentsService } from '../payments.service';
import { PurchasesModel } from '../../purchases/purchases.interface';
import { PurchasesService } from '../../purchases/purchases.service';
import { ConstantsModel } from '../../payment_methods/payment_methods.interface';
import { PaymentMethodsService } from '../../payment_methods/payment_methods.service';
import { CajaCentralService } from '../../caja_central/caja_central.service';
import { CentralModel } from '../../caja_central/caja_central.interface';
import { CuentaContableModel } from '../../cuentas_contables/cuentas_contables.interface';
import { CuentasContablesService } from '../../cuentas_contables/cuentas_contables.service';
// Removed unused import


@Component({
  selector: 'app-payment-simple-form',
  templateUrl: './payment_simple_form.component.html',
  styleUrls: ['./payment_simple_form.component.scss']
})
export class PaymentsSimpleFormComponent {

  hasDetroyed$ = new Subject<boolean>();

  constructor(
      private fbuild:FormBuilder,
      private principalService: PaymentsService,
      private monedasService: MonedasService,
      private SuppliersService: SuppliersService,
      private productsService: ProductsService,
      private purchasesServices: PurchasesService,
      private paymentMethodsServices: PaymentMethodsService,
      private centralsServices: CajaCentralService,
      private cuentasContablesService: CuentasContablesService,
      public dialogRef:MatDialogRef<PaymentsSimpleFormComponent>) { }


  formInstance:FormGroup;
  instanceToEdit:PaymentModel;
  error=false;

  suppliers:SupplierModel[]
  products:ProductModel[]
  monedas:MonedaModel[]
  compras:PurchasesModel[]
  metodos:ConstantsModel[]
  centrales:CentralModel[]
  cuentas: CuentaContableModel[]
  tipoOperacion: number = 1;

  @Output() refreshTable:boolean = false;
    

  addInstance(instance:PaymentModel){
      this.principalService.createItem(instance).subscribe({
      complete: ()=>{this.dialogRef.close();}}
  )}

  updateInstance(instance:PaymentModel){
      this.principalService.editItem(instance).subscribe({
      complete: ()=>{this.dialogRef.close();}
  })}


  getElementEdit(){

      return this.principalService.oneItem.subscribe(
      val=>{
          this.instanceToEdit = val;
      }
      )
  }


  getSuppliers(){
      this.SuppliersService.getListCache()
      .pipe(takeUntil(this.hasDetroyed$))
      .subscribe(
      (val) => {
          this.suppliers = val
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

  crearNuevaCompra() {
    // Abre un diálogo o navega a módulo de compras
    console.log("Abrir diálogo para nueva compra");
  }
    
  getProducts(){
      this.productsService.getListCache()
        .pipe(takeUntil(this.hasDetroyed$))
        .subscribe(
        (val) => this.products = val  
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
  
  getCompras(){
    this.purchasesServices.getListCache()
    .pipe(
      takeUntil(this.hasDetroyed$),
      map((compras) => compras.filter(compra => compra.pagado === false))
    )
    .subscribe(
    (val) => this.compras = val  
    )
  }

  getCuentas(){
    this.cuentasContablesService.getListCache()
        .pipe(takeUntil(this.hasDetroyed$))
        .subscribe(
          (val) => this.cuentas = val  
    )
  }

  recallItem(){
    this.principalService.oneItem
      .pipe(
            //take(1),
        takeUntil(this.hasDetroyed$),
        filter(item => item !== null),
        tap( (item)=> this.instanceToEdit=item),
        switchMap( item => 
          this.principalService.getItem(item.id)
        ),
      ).subscribe(
        val=>{
          this.instanceToEdit = val;
          this.formInstance.get('compra')?.patchValue(this.instanceToEdit.compra.id);
          this.formInstance.get('referencia')?.patchValue(this.instanceToEdit.referencia);
          this.formInstance.get('metodo')?.patchValue(this.instanceToEdit.metodo);
          this.formInstance.get('moneda')?.patchValue(this.instanceToEdit.moneda?.id);
          this.formInstance.get('total')?.patchValue(this.instanceToEdit.total);
          this.formInstance.get('fecha')?.patchValue(this.instanceToEdit.fecha);
          this.formInstance.get('detalle')?.patchValue(this.instanceToEdit.detalle);
          this.formInstance.get('cuenta_gasto')?.patchValue(this.instanceToEdit.cuenta_destino?.id);
      })
    }


  detailItem(id: number): Observable<PaymentModel>{
    return this.principalService.getItem(id)
  }
  
  ngOnInit(): void {
    this.getSuppliers()
    this.getProducts()
    this.getMonedas()
    this.getCompras()
    this.getMethods()
    this.getCentrals()
    this.getCuentas()
    this.formInstance = this.fbuild.group({
      tipo_operacion: [1, Validators.required],
      compra: [null],
      cuenta_gasto: [null],
      concepto: [null],
      referencia: [null],
      detalle: [null],
      moneda: ['', [Validators.required]],
      metodo: ['', [Validators.required]],
      total: ['', [Validators.required]],
      num_documento: [null],
      fecha: ['', [Validators.required]],
      hora: ['', Validators.required],
      cargo: [null],
    })
    this.formInstance.get('referencia')?.disable();
    this.formInstance.getRawValue();

    // Cuando cambia la compra, setea la cuenta contable asociada
    this.formInstance.get('compra')?.valueChanges
      .pipe(takeUntil(this.hasDetroyed$))
      .subscribe(compraId => {
        console.log("Compra seleccionada:", compraId);
        if (compraId && this.compras) {
          const compraSeleccionada: PurchasesModel = this.compras.find(c => c.id === compraId);
          console.log("Compra encontrada:", compraSeleccionada.tipo_documento);

          if (compraSeleccionada && compraSeleccionada.tipo_documento){
            console.log("Cuenta contable por defecto:", compraSeleccionada.tipo_documento.cta_default);
            this.formInstance.get('cuenta_gasto')?.setValue(compraSeleccionada.tipo_documento.cta_default);
          }
          // Ajusta el nombre del campo según tu modelo de compra
          if (compraSeleccionada && compraSeleccionada.numero_documento){
          console.log("Número de documento:", compraSeleccionada.numero_documento);
            this.formInstance.get('referencia')?.setValue(compraSeleccionada.numero_documento);
          }
        }
      });

    this.recallItem()

  }

  refreshTables() {

  }


// onTipoOperacionChange() {
//   this.tipoOperacion = this.formInstance.get('tipo_operacion')?.value;

//   // Limpia los valores y validadores
//   this.formInstance.get('compra')?.reset();
//   this.formInstance.get('cuenta_gasto')?.reset();
//   this.formInstance.get('concepto')?.reset();

//   // Primero, limpia todos los validadores
//   this.formInstance.get('compra')?.clearValidators();
//   this.formInstance.get('cuenta_gasto')?.clearValidators();
//   this.formInstance.get('concepto')?.clearValidators();

//   if (this.tipoOperacion === 1) {
//     // Pago de Compra: compra y cuenta_destino requeridos
//     this.formInstance.get('compra')?.setValidators([Validators.required]);
//   } else if (this.tipoOperacion === 3) {
//     // Egreso con Concepto: cuenta_destino requerido, concepto podría ser requerido si lo usas
//     // Si concepto es requerido, descomenta:
//     this.formInstance.get('concepto')?.setValidators([Validators.required]);
//   }

//   // Actualiza el estado de validación
//   this.formInstance.get('compra')?.updateValueAndValidity();
//   this.formInstance.get('cuenta_gasto')?.updateValueAndValidity();
//   this.formInstance.get('concepto')?.updateValueAndValidity();
// }

  onSubmit(){
    if((this.formInstance.status != 'INVALID')){  
      const formData = this.formInstance.getRawValue();
      if(!this.instanceToEdit){
        this.addInstance(formData);
      }
      else{
        formData['id'] = this.instanceToEdit.id;
        this.updateInstance(this.formInstance.value);
        this.principalService.oneItem.next(null);
      }}
    else{
        this.error=true;
        Object.keys(this.formInstance.controls).forEach(key => {
          const control = this.formInstance.get(key);
          if (control && control.invalid) {
            console.warn(`Control "${key}" is invalid:`, control.errors);
          }
        });
      
    }

  }
  
    
  ngOnDestroy(): void {
    this.hasDetroyed$.next(true);
    this.hasDetroyed$.complete();
  }
}

