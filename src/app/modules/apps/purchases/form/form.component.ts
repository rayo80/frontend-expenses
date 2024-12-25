import { SvPurchaseItemSchema, SvPurchasesSchema } from './../purchases.interface';
import { products } from './../../../../mock-api/apps/ecommerce/inventory/data';
import { SuppliersService } from './../../suppliers/suppliers.service';
import { ComprobanteTiposService } from './../../comprobante_tipos/comprobante_tipos.service';
import { Component, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PurchasesService } from '../purchases.service';
import { PurchasesDetailModel, PurchasesItemModel, PurchasesModel } from '../purchases.interface';
import { ComprobanteTiposModel } from '../../comprobante_tipos/comprobante_tipos.interface';
import { SupplierModel } from '../../suppliers/suppliers.interface';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ProductsService } from '../../productos/productos.service';
import { ProductModel, SvProductSchema } from '../../productos/productos.interface';
import { Observable, finalize, map, mergeMap, of, tap, filter, switchMap, takeUntil, take, Subject } from 'rxjs';
import { MonedasService } from '../../monedas/monedas.service';
import { MonedaModel } from '../../monedas/monedas.interface';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class PurchasesFormComponent {

  hasDetroyed$ = new Subject<boolean>();

  constructor(
    private fbuild:FormBuilder,
    private principalService: PurchasesService,
    private monedasService: MonedasService,
    private SuppliersService: SuppliersService,
    private productsService: ProductsService,
    private comprobantesTiposService: ComprobanteTiposService,
    public dialogRef:MatDialogRef<PurchasesFormComponent>) { }

  formInstance:FormGroup;
  formInstanceItem:FormGroup
  instanceToEdit:PurchasesDetailModel; //data de los items editados

  error=false;
  
  comprobantes_tipos:ComprobanteTiposModel[]
  suppliers:SupplierModel[]
  products:ProductModel[]
  monedas:MonedaModel[]

  itemsTableForm: PurchasesItemModel

  @Output() refreshTable:boolean = false;
  
  @ViewChild(MatTable) table: MatTable<PurchasesItemModel[]>;
  dataSource = new MatTableDataSource<PurchasesItemModel>();
  displayedColumns: string[] = ["producto", "cantidad", "total"];

  addInstance(instance:PurchasesDetailModel){
    this.principalService.createItem(instance).subscribe({
    complete: ()=>{this.dialogRef.close();}}
  )}

  updateInstance(instance:PurchasesDetailModel){
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

  getComprobantesTipos(){
    this.comprobantesTiposService.getList()
    .pipe(takeUntil(this.hasDetroyed$))
    .subscribe(
      (val) => {
        this.comprobantes_tipos = val;
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

  getProducts(){
    this.productsService.getListCache()
    .pipe(takeUntil(this.hasDetroyed$))
    .subscribe(
      (val) => this.products = val  
    )
  }

  getItemDetail(id: number){
    return this.principalService.getItem(id)
      .pipe(
        tap((val) => this.instanceToEdit=val)
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
        
        this.formInstance.get('proveedor')?.patchValue(this.instanceToEdit.proveedor.id);
        this.formInstance.get('tipo_documento')?.patchValue(this.instanceToEdit.tipo_documento.id);
        this.formInstance.get('moneda')?.patchValue(this.instanceToEdit.moneda?.id);
        this.formInstance.get('num_documento')?.patchValue(this.instanceToEdit.numero_documento);
        this.formInstance.get('total')?.patchValue(this.instanceToEdit.total);
        this.formInstance.get('fecha_vencimiento')?.patchValue(this.instanceToEdit.fecha_vencimiento);
        this.formInstance.get('fecha_documento')?.patchValue(this.instanceToEdit.fecha_documento);
        this.dataSource.data = this.instanceToEdit.items
      })
  }


  detailItem(id: number): Observable<PurchasesDetailModel>{
    return this.principalService.getItem(id)
  }
  
  ngOnInit(): void {
    this.getSuppliers()
    this.getComprobantesTipos()
    this.getProducts()
    this.getMonedas()

    this.formInstance = this.fbuild.group({
      tipo_documento: ['', [Validators.required]],
      proveedor: ['', [Validators.required]],
      moneda: ['', [Validators.required]],
      total: ['', [Validators.required]],
      num_documento: ['', [Validators.required]],
      fecha_documento: ['', [Validators.required]],
      fecha_vencimiento: ['', [Validators.required]],
      items: this.fbuild.array([])

      })


    this.formInstanceItem = this.fbuild.group({
        producto: ['', ],
        total: ['', ], // Nuevo campo de nombre
        cantidad: ['',]
    });


    this.recallItem()

  }

  refreshTables() {

  }



  addItem(){
    let item: SvPurchaseItemSchema;
    let producto: any

    // antes agregaba de frente uno por uno ..porque nop eran objetos
    // (this.formInstance.get('items') as FormArray)?.push(this.formInstanceItem);

    //seteo la data al formulario
    console.log("actual table", this.itemsTableForm)
    if (this.formInstanceItem.status != 'INVALID') {

      this.productsService.getItemById(this.formInstanceItem.get("producto")?.value).subscribe(
        (val) => producto = val
      )

      const itemModel = new PurchasesItemModel({
        "id": null,
        "producto": producto,
        "total": this.formInstanceItem.get('total')?.value,
        "cantidad": this.formInstanceItem.get('cantidad')?.value
      })

      // Actualizo la lista de items y seteo el valor de items en la lista
      console.log("antes", this.itemsTableForm)


      this.dataSource.data.push(itemModel)
      const formatTable = this.dataSource.data.map(item => item.itemForm())
      /*this.itemsTableForm.push(itemModel)
      console.log("despues", this.itemsTableForm)
      this.dataSource.data = this.itemsTableForm

      const formatTable = this.itemsTableForm.map(item => item.itemForm())*/

      
      this.formInstance.setControl(
        "items",
        this.fbuild.array(formatTable)
      )
      console.log("lista", this.formInstance.value["items"])
      console.log("table form", this.itemsTableForm)
      this.table.renderRows();

      // seteo el total en el formulario grande segun los items hijos
      this.formInstance.get('total')?.patchValue(this.formInstance.get('total').value + this.formInstanceItem.get('total').value)
      console.log("form isntance", this.formInstance)
      console.log("items form instance", this.itemsTableForm)
      this.formInstanceItem.reset();
    }


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

