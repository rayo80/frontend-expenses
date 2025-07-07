import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, shareReplay, Subject, tap, throwError } from 'rxjs';
import { ICrudModel,  } from './list-base.types';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-detail/error-detail.component';

@Injectable({
  providedIn: 'root'
})

export abstract class ListServiceAbstract<IModel extends ICrudModel, Response> {
  abstract url: string;

  items: BehaviorSubject<IModel[]> = new BehaviorSubject<IModel[]>([]);
  oneItem: BehaviorSubject<IModel | null> = new BehaviorSubject(null);
  private _itemsCache$: Observable<IModel[]>


  // -----------------------Borrar
  errores: BehaviorSubject<any> = new BehaviorSubject(null);

  // ------------------------

  //Mi base ya ejecuta acciones con HTTP
  // constructor(private _http: HttpClient) { 
  // }

  _http: HttpClient = inject(HttpClient)
  abstract interfaceToModelAbstract(data: Response): IModel;

  // Pide la lista al servidor y actualiza 
  // nuestro subject items
  getList(): Observable<IModel[]> {
      return this._http.get<Response[]>(this.url).pipe(
          map(res =>
              res.map(item => this.interfaceToModelAbstract(item))
          ),
          tap((newres) => {
              this.items.next(newres);
          })
      );
  }

  getListCache(): Observable<IModel[]> {
    console.log(this._itemsCache$)
    if (!this._itemsCache$) {
      this._itemsCache$ = this.getList().pipe(shareReplay(1));
    }
    return this._itemsCache$
  }

  createItem(data: IModel): Observable<IModel> {
    return this._http.post<Response>(this.url, data).pipe(

        map(res => this.interfaceToModelAbstract(res)),
        tap((res) => {
          this.items.next([...this.items.value, res]);
        })
    );
  }
  
  editItem(data: IModel): Observable<IModel> {
    return this._http.put<Response>(this.url + '/' + data.id, data)
      .pipe(
        catchError(this.manejarError),
        map(res => this.interfaceToModelAbstract(res)),
        tap((res) => {
          const prevAlums = this.items.value.filter(a=>a.id != data.id);
          this.items.next([res, ...prevAlums]);
        })
    );
  }

  deleteItem(data: IModel):Observable<IModel> {
    return this._http.delete<IModel>(this.url + '/' + data.id)
      .pipe(
        tap(()=>{
          const newAlum = this.items.value.filter(a=>a.id != data.id);
          this.items.next(newAlum)
        })
      )
  }

  //get single Item
  getItem(id: number): Observable<IModel> {
    return this._http.get<Response>(this.url + '/'+ id).pipe(
        map(res => this.interfaceToModelAbstract(res)),
        // tap((newres) => {
        //    this.oneItem.next(newres);
        // })
    );
  }

  getItemById(id: number): Observable<IModel> {
    return this._itemsCache$.pipe(
      map(items => items.find(item => item.id === id))
    )
  }


  manejarError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      // console.warn('Error del lado del cliente', error.error.message);
    }else{
      // console.warn('Error del lado del servidor', error.error.message);
      if (error.status == 400){
        alert(JSON.stringify(error.error))
      }
    }

    return throwError(() => new Error('Error en la comunicacion HTTP'));
  }
}
