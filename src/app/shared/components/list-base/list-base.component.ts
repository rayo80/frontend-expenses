import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ListServiceAbstract } from './list-base-service.abstract';
import { ICrudModel, IListColums, ModelId } from './list-base.types';

import { MatMenuTrigger } from '@angular/material/menu';
import { ActionsMenu, IMenuItems as IMenu } from '../models/menu-modal.interface';
import { ErrorDialogComponent } from '../error-detail/error-detail.component';

@Component({
  selector: 'app-list-base',
  templateUrl: './list-base.component.html',
  styleUrls: ['./list-base.component.scss']
})

export class ListBaseComponent<IModel extends ICrudModel, Response>
    implements OnInit, OnDestroy, AfterViewInit{
  // necesito que me manden el servicio que extendera de una clase abstracta
  // por lo que tendra los atributos que necesito
  @Input() service: ListServiceAbstract<IModel , Response>;
  @Input() title: string;
  @Input() fieldsHeader: IListColums[];
  @Input() tableActions: string[];
  @Input() detailUrl: string;
  @Input() modal: any = null;
  @Input() printable = false;
  @Input() crudMethods: string[] = [ActionsMenu.CREATE, ActionsMenu.DELETE, ActionsMenu.EDIT];
  @Input() menuItems: IMenu[] = [
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
      actions: ActionsMenu.DELETE}
  ];
  @Input() requireGetDetail = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<IModel[]>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('menuTrigger', {read: MatMenuTrigger, static: false}) contextMenu: MatMenuTrigger;

  @Output() clickMenu = new EventEmitter<{ row: IModel, menuItem: IMenu}>();

  contextMenuPosition = {x: '0px', y: '0px'};
  menuItemsFiltered: IMenu[] = [];

  _main = true;
  dataSource = new MatTableDataSource<IModel>();
  hasDetroyed$ = new Subject<boolean>();
  canCreate: boolean = true;
  canEdit: boolean = true;
  canDelete: boolean = true;
  displayedColumns: string[] = ["producto", "cantidad", "total"];
  // error: any = null;
  

  constructor(public _dialog: MatDialog,
              private router: Router) {

  }

  ngOnInit(): void {
    this.configCrud()
    this.getAPIItems()
    this.refreshColumns()
  }
  
  configCrud(){
    this.canCreate = this.crudMethods.includes(ActionsMenu.CREATE);
    this.canEdit = this.crudMethods.includes(ActionsMenu.EDIT);
    this.canDelete = this.crudMethods.includes(ActionsMenu.DELETE);
  }



  openModal(){
    if(this.modal !== null){
      const dialogRef = this._dialog.open(this.modal,{
        autoFocus: false,
      });
      
      dialogRef.afterClosed()
      .pipe(
        takeUntil(this.hasDetroyed$),
        switchMap(() => {return this.service.items})
      )
      .subscribe((data) =>(this.dataSource.data = data))
    }
    else{
      alert("Error: incomplete model")
    }
  }

  triggerContextMenu(event, row) {
    if (this.menuItems.length > 0) {
      this.contextMenuPosition.x = event.clientX + 'px';
      this.contextMenuPosition.y = event.clientY + 'px';
      this.contextMenu.menuData = { 'element': row };
      this.contextMenu.menu.focusFirstItem('mouse');
      this.menuItemsFiltered = this.menuItems.map(i => i);
      // if (!this.service.reactivable || row.activo) {
      //   this.menuItemsFiltered = this.menuItemsFiltered.filter(i => i.code !== 'reactivar');
      // } else {
      //   this.menuItemsFiltered = this.menuItemsFiltered.filter(i => i.code !== 'delete' && i.code !== 'edit');
      // }
      if (!this.canDelete) {
       this.menuItemsFiltered = this.menuItemsFiltered.filter(i => i.actions !== ActionsMenu.DELETE);
      }
      if (!this.canEdit) {
        this.menuItemsFiltered = this.menuItemsFiltered.filter(i => i.actions !==  ActionsMenu.EDIT);
      }
      this.contextMenu.openMenu();
    }
  }

  // openErrorModal(){
  //   if(this.error !== null){
  //     const dialogRef = this._dialog.open(ErrorDialogComponent,{
  //       autoFocus: false,
  //     });
  //   }
  // }

  onContextMenu(event, row: ICrudModel) {
    event.preventDefault();
    this.triggerContextMenu(event, row);
  }

  onClickRow(row: ICrudModel) {
    
  }

  onClickMenu(row: IModel, menuItem: IMenu) {
    switch (menuItem.actions) {
      case ActionsMenu.DELETE:
        //this.deleteConfirmation(row);
        break;
      // case 'reactivar':
      //   this.service.reactivarItem(row.id).subscribe();
      //   break;
      case ActionsMenu.EDIT:
        // this.service.setItem(null);
        // this.service.getCompleteItem(row.id);
        // this.dialog.open(this.modal, {
        //   width: this.modalWidth,
        // });
        this.onUpdate(row)
        break
      default:
        this.clickMenu.emit({row, menuItem});
    }
  }


  getAPIItems(){
    this.service.getList()
      .pipe(takeUntil(this.hasDetroyed$))
      .subscribe(
        (val)=>this.dataSource.data=val
    )
  }


  ngOnDestroy(): void {
    this.hasDetroyed$.next(true);
    this.hasDetroyed$.complete();
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    // importante sort trabaja con los matColumnDef asi que debemos usar ahi el codigo/id de nuestros campos de nuestro json cargado en la tabla
    this.dataSource.sort = this.sort;
  }

  onCreate(): void {
    // le mandamos null al item de edicion
    console.log("aca falla one Item ya es null")
    this.service.oneItem.next(null);
    this.openModal()
  }

  onDetail(elemento: IModel){
    this.router.navigate([this.detailUrl, elemento.id]);
  }

  onUpdate(data: IModel){
    this.getCompleteItem(data.id, data)
    this.openModal()
  }
  
  onDelete(data: IModel){

  }

  toggleColumn(event: MouseEvent, header: IListColums) {
    for (let i = 0; this.fieldsHeader.length > i; i++) {
      if (this.fieldsHeader[i].name === header.name) {
        this.fieldsHeader[i].show = !header.show;
      }
    }
    this.refreshColumns();
    event.stopPropagation();
  }

  refreshColumns(): void {
    this.displayedColumns = [];
    for (let i = 0; this.fieldsHeader.length > i; i++) {
      if (this.fieldsHeader[i].show) {
        this.displayedColumns.push(this.fieldsHeader[i].code);
      }
    }
  }

  //si el detalle necesita mas campos que el item listado
  getCompleteItem(id: number, data: IModel): void {
    if (this.requireGetDetail) {
      this.service.getItem(id).subscribe();
    } else {
      this.service.oneItem.next(data);
    }
  };


}
