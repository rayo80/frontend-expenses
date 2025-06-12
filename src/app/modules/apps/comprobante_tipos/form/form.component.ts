import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ComprobanteTiposService } from '../comprobante_tipos.service';
import { ComprobanteTiposModel } from '../comprobante_tipos.interface';
import { CuentaContableModel } from '../../cuentas_contables/cuentas_contables.interface';
import { CuentasContablesService } from '../../cuentas_contables/cuentas_contables.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  formInstance: FormGroup;
  instanceToEdit: ComprobanteTiposModel | null = null;
  error = false;
  cuentas: CuentaContableModel[];
  hasDetroyed$ = new Subject<boolean>();
  
  constructor(
    private fbuild: FormBuilder,
    private principalService: ComprobanteTiposService,
    private cuentasService: CuentasContablesService,
    public dialogRef: MatDialogRef<FormComponent>
  ) {
    this.formInstance = this.fbuild.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      cta_default: ['']
    });
  }

  addInstance(instance:ComprobanteTiposModel){
    this.principalService.createItem(instance).subscribe({
    complete: ()=>{this.dialogRef.close();}}
  )}

  updateInstance(instance:ComprobanteTiposModel){
    this.principalService.editItem(instance).subscribe({
    complete: ()=>{this.dialogRef.close();}
  })}


  getElementEdit(){
  this.principalService.oneItem.subscribe(
    val=>{
    this.instanceToEdit=val;}
    )
  }

    getCuentas(){
        this.cuentasService.getListCache()
          .pipe(takeUntil(this.hasDetroyed$))
          .subscribe(
          (val) => this.cuentas = val  
          )
    }

  ngOnInit(): void {
    // Si vas a editar, carga los datos aquí
    this.getCuentas();
    this.getElementEdit();
    if (this.instanceToEdit) {
      this.formInstance.patchValue({
        codigo: this.instanceToEdit.codigo,
        nombre: this.instanceToEdit.nombre,
        cta_default: this.instanceToEdit.cta_default?.id
      });
    }
  }



onSubmit(){

  if((this.formInstance.status != 'INVALID')){  

    if(!this.instanceToEdit){
      this.addInstance(this.formInstance.value);
    }
    else{
      console.log('update', this.formInstance.value)
      this.formInstance.value['id'] = this.instanceToEdit.id;
      this.updateInstance(this.formInstance.value);
      this.principalService.oneItem.next(null);
    }
    }else{
    this.error=true;
  }
  }
}