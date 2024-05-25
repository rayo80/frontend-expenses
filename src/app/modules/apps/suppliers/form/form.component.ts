import { SuppliersService } from './../suppliers.service';
import { Component, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SupplierModel } from '../suppliers.interface';
import { DocIdentidadTipoService } from '../../doc_identidad_tipos/doc_identidad_tipos.service';
import { DocIdentidadTipoModel } from '../../doc_identidad_tipos/doc_identidad_tipos.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  constructor(private fbuild:FormBuilder,
    private principalService:SuppliersService,
    private docIdentidadService:DocIdentidadTipoService,
    public dialogRef:MatDialogRef<FormComponent>) { }
  
  formInstance:FormGroup;
  instanceToEdit:SupplierModel; //inscripcion a ser editado
  error=false;

  @Output() refreshTable:boolean = false;

  doc_identidad_tipos: DocIdentidadTipoModel[]
    
  getDocIdentidadTipoList(){
    this.docIdentidadService.getList().subscribe(
      (val) => this.doc_identidad_tipos = val  
    )
  }


  addInstance(instance:SupplierModel){
    this.principalService.createItem(instance).subscribe({
    complete: ()=>{this.dialogRef.close();}}
  )}

  updateInstance(instance:SupplierModel){
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
    this.getDocIdentidadTipoList()
    this.formInstance = this.fbuild.group({
      tipo_documento: ['', [Validators.required]],
      num_documento: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      codigo: ['', [Validators.required]],
      razon: ['', [Validators.required]],
      addres: ['', [Validators.required]],
    })
    this.getElementEdit();

    if(this.instanceToEdit){
      this.formInstance.get('tipo_documento')?.patchValue(this.instanceToEdit.tipo_documento?.id);
      this.formInstance.get('num_documento')?.patchValue(this.instanceToEdit.num_documento);
      this.formInstance.get('nombre')?.patchValue(this.instanceToEdit.nombre);
      this.formInstance.get('codigo')?.patchValue(this.instanceToEdit.codigo);
      this.formInstance.get('razon')?.patchValue(this.instanceToEdit.razon);
      this.formInstance.get('addres')?.patchValue(this.instanceToEdit.addres);
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
