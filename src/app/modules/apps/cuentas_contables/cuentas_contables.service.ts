import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CuentaContableModel as CrudModel, SvCuentaContableSchema as SvCrudSchema} from './cuentas_contables.interface';
import { environment } from 'environments/environment';
import { ListServiceAbstract } from 'app/shared/components/list-base/list-base-service.abstract';

@Injectable({
  providedIn: 'root'
})
export class CuentasContablesService extends ListServiceAbstract<CrudModel, SvCrudSchema>{
  url = environment.url+'/api/cuentas_contables'


  constructor(_http: HttpClient) {
    super(_http)
  }


  interfaceToModelAbstract(data: SvCrudSchema): CrudModel {
    return new CrudModel(data)
  }
}
