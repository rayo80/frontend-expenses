
// Removed unused import
import { SuppliersService } from './../../suppliers/suppliers.service';
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
// Removed unused import


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class PaymentsFormComponent {

  hasDetroyed$ = new Subject<boolean>();

  constructor(
      private fbuild:FormBuilder,
      private principalService: PaymentsService,
      private monedasService: MonedasService,
      private SuppliersService: SuppliersService,
      private productsService: ProductsService,
      private purchasesServices: PurchasesService,
      private paymentMethodsServices: PaymentMethodsService,
      public dialogRef:MatDialogRef<PaymentsFormComponent>) { }


  formInstance:FormGroup;
  instanceToEdit:PaymentModel;
  error=false;

  suppliers:SupplierModel[]
  products:ProductModel[]
  monedas:MonedaModel[]
  compras:PurchasesModel[]
  metodos:ConstantsModel[]
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

    this.formInstance = this.fbuild.group({
      tipo_operacion: [1, Validators.required],
      compra: [null],
      cuenta_destino: [null],
      concepto: [null],
      referencia: ['', [Validators.required]],
      moneda: ['', [Validators.required]],
      metodo: ['', [Validators.required]],
      total: ['', [Validators.required]],
      num_documento: ['', [Validators.required]],
      fecha: ['', [Validators.required]],

      })




    this.recallItem()

  }

  refreshTables() {

  }


  onTipoOperacionChange() {
    this.tipoOperacion = this.formInstance.get('tipo_operacion')?.value;
    // Reset de campos no usados
    this.formInstance.patchValue({
      compra: null,
      cuenta_destino: null,
      concepto: null
    });
  }

  onSubmit(){
    if((this.formInstance.status != 'INVALID')){  

      if(!this.instanceToEdit){
        this.addInstance(this.formInstance.value);
      }else{
        this.formInstance.value['id'] = this.instanceToEdit.id;
        this.updateInstance(this.formInstance.value);
        this.principalService.oneItem.next(null);
      }
      }else{
        this.error=true;
    }
    }
  
    
  ngOnDestroy(): void {
    this.hasDetroyed$.next(true);
    this.hasDetroyed$.complete();
  }
}

