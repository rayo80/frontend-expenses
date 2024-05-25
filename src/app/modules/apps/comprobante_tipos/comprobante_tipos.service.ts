import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ComprobanteTiposModel as CrudModel, SvComprobanteTiposSchema as SvCrudSchema} from './comprobante_tipos.interface';
import { environment } from 'environments/environment';
import { ListServiceAbstract } from 'app/shared/components/list-base/list-base-service.abstract';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteTiposService extends ListServiceAbstract<CrudModel, SvCrudSchema>{
  url = environment.url+'/api/comprobantes_tipo'


  constructor(_http: HttpClient) {
    super(_http)
  }


  interfaceToModelAbstract(data: SvCrudSchema): CrudModel {
    return new CrudModel(data)
  }
}
