import { ProductsService } from './../productos.service';
import { Component, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductModel } from '../productos.interface';
import { DocIdentidadTipoModel } from '../../doc_identidad_tipos/doc_identidad_tipos.interface';
import { CuentasContablesService } from '../../cuentas_contables/cuentas_contables.service';
import { CuentaContableModel } from '../../cuentas_contables/cuentas_contables.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  constructor(private fbuild:FormBuilder,
    private principalService:ProductsService,
    private cuentasService:CuentasContablesService,
    public dialogRef:MatDialogRef<FormComponent>) { }
  
  formInstance:FormGroup;
  instanceToEdit:ProductModel; //inscripcion a ser editado
  error=false;

  @Output() refreshTable:boolean = false;

  cuentas: CuentaContableModel[]
    
  getCuentas(){
    this.cuentasService.getList().subscribe(
      (val) => this.cuentas = val  
    )
  }


  addInstance(instance:ProductModel){
    this.principalService.createItem(instance).subscribe({
    complete: ()=>{this.dialogRef.close();}}
  )}

  updateInstance(instance:ProductModel){
    this.principalService.editItem(instance).subscribe({
    complete: ()=>{this.dialogRef.close();}
  })}


  getElementEdit(){
  this.principalService.oneItem.subscribe(
    val=>{
    this.instanceToEdit=val;}
    )
  }

  ngOnInit(): void {
    this.getCuentas()
    this.formInstance = this.fbuild.group({
      price: ['', [Validators.required]],
      purchase_price: ['', [Validators.required]],
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      cta_ingreso: [null],
      cta_salida: [null],
      se_compra: [false,],
      se_vende: [false, ],
    })
    this.getElementEdit();

    if(this.instanceToEdit){
      this.formInstance.get('price')?.patchValue(this.instanceToEdit.precio);
      this.formInstance.get('purchase_price')?.patchValue(this.instanceToEdit.precio_compra);
      this.formInstance.get('name')?.patchValue(this.instanceToEdit.name);
      this.formInstance.get('code')?.patchValue(this.instanceToEdit.codigo);
      this.formInstance.get('cta_ingreso')?.patchValue(this.instanceToEdit.cta_ingreso?.id);
      this.formInstance.get('cta_salida')?.patchValue(this.instanceToEdit.cta_salida?.id);
      this.formInstance.get('se_compra')?.patchValue(this.instanceToEdit.se_compra);
      this.formInstance.get('se_vende')?.patchValue(this.instanceToEdit.se_vende);
    }
  }

onSubmit(){

  if((this.formInstance.status != 'INVALID')){  

    if(!this.instanceToEdit){
      this.addInstance(this.formInstance.value);
    }
    else{
      console.log(this.formInstance.value)
      this.formInstance.value['id'] = this.instanceToEdit.id;
      this.updateInstance(this.formInstance.value);
      this.principalService.oneItem.next(null);
    }
    }else{
    this.error=true;
  }
  }

}
