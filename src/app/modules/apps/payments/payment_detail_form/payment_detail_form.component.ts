
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
import { ComprobanteTiposModel } from '../../comprobante_tipos/comprobante_tipos.interface';
import { ComprobanteTiposService } from '../../comprobante_tipos/comprobante_tipos.service';
// Removed unused import


@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment_detail_form.component.html',
  styleUrls: ['./payment_detail_form.component.scss']
})
export class PaymentsDetailFormComponent {

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
      private comprobantesTipoService: ComprobanteTiposService,
      private cuentasContablesService: CuentasContablesService,
      public dialogRef:MatDialogRef<PaymentsDetailFormComponent>) { }


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
  igv_tipos: ConstantsModel[]
  comprobante_tipos: ComprobanteTiposModel[]
  tipoOperacion: number = 1;

  @Output() refreshTable:boolean = false;
    

  addInstance(instance:PaymentModel){
      this.principalService.createDirectItem(instance).subscribe({
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
        .pipe(
          takeUntil(this.hasDetroyed$),
          map(products => products.filter(product => product.se_compra === true))) // Filtra productos activos
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

    getComprobantes(){
    this.comprobantesTipoService.getListCache()
        .pipe(takeUntil(this.hasDetroyed$))
        .subscribe(
          (val) => this.comprobante_tipos = val  
    )
  }


  getCalculos(){

    this.igv_tipos = [
      { id: 1, name: 'IGV 18%' },
      { id: 2, name: 'IGV 0%' },
      { id: 3, name: 'Interno' },
    ]
  }

  setAbonadoYIgv() {
    const total = Number(this.formInstance.get('total')?.value) || 0;
    const igvTipo = this.formInstance.get('igv_tipo')?.value;
    const igv = igvTipo === 1 ? +(total * 18/118).toFixed(2) : 0;
    console.log("IGV Tipo:", igvTipo, "Total:", total, "IGV Calculado:", igv);
    this.formInstance.get('abonado')?.setValue(total, { emitEvent: false });
    this.formInstance.get('igv')?.setValue(igv, { emitEvent: false });
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
    this.getMethods()
    this.getCentrals()
    this.getCuentas()
    this.getCalculos()
    this.getComprobantes()
    this.formInstance = this.fbuild.group({
      abonado: [null, [Validators.required]],
      tipo_operacion: [1, Validators.required],
      cantidad: [1, Validators.required],
      cuenta_gasto: [null],
      concepto: [null],
      igv_tipo: [1],
      referencia: [null],
      moneda: ['', [Validators.required]],
      metodo: ['', [Validators.required]],
      proveedor: [null],
      total: ['', [Validators.required]],
      num_documento: [null],
      fecha: ['', [Validators.required]],
      hora: ['', Validators.required],
      igv: [null],
      tipo_documento: [null, Validators.required],
      cargo: [null],
    })

    this.formInstance.get('igv')?.disable();
    this.formInstance.get('abonado')?.disable();

    // Cuando cambia la compra, setea la cuenta contable asociada
    this.formInstance.get('tipo_documento')?.valueChanges
      .pipe(takeUntil(this.hasDetroyed$))
      .subscribe(comprobanteId => {
        if (comprobanteId && this.comprobante_tipos) {
          const comprobante_tipo: ComprobanteTiposModel = this.comprobante_tipos.find(c => c.id === comprobanteId);
          // Ajusta el nombre del campo según tu modelo de compra
          console.log("Compra seleccionada:", comprobante_tipo);
          if (comprobante_tipo && comprobante_tipo.cta_default){
            this.formInstance.get('cuenta_gasto')?.setValue(comprobante_tipo.cta_default.id);
          }
        }
      });

    this.formInstance.get('concepto')?.valueChanges
      .pipe(takeUntil(this.hasDetroyed$))
      .subscribe(productoId => {
        const comprobanteId = this.formInstance.get('tipo_documento')?.value;
        const comprobante = this.comprobante_tipos?.find(c => c.id === comprobanteId);

        // Si el comprobante es tipo 0 o no tiene cta_default
        if (comprobante && (comprobante.codigo === 0 || !comprobante.cta_default)) {
          const productoSeleccionado = this.products?.find(p => p.id === productoId);
          if (productoSeleccionado && productoSeleccionado.cta_salida) {
            this.formInstance.get('cuenta_gasto')?.setValue(productoSeleccionado.cta_salida.id);
          }
        }
      });



    this.formInstance.get('total')?.valueChanges
      .pipe(takeUntil(this.hasDetroyed$))
      .subscribe(total => {
        this.setAbonadoYIgv();
      });

    this.formInstance.get('igv_tipo')?.valueChanges
      .pipe(takeUntil(this.hasDetroyed$))
      .subscribe(() => {
        this.setAbonadoYIgv();
      });




    this.recallItem()

  }

  refreshTables() {

  }



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

