import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DocIdentidadTipoModel as CrudModel, SvDocIdentidadTipoSchema as SvCrudSchema} from './doc_identidad_tipos.interface';
import { environment } from 'environments/environment';
import { ListServiceAbstract } from 'app/shared/components/list-base/list-base-service.abstract';

@Injectable({
  providedIn: 'root'
})
export class DocIdentidadTipoService extends ListServiceAbstract<CrudModel, SvCrudSchema>{
  url = environment.url+'/api/doc_identidad_tipo'


  constructor(_http: HttpClient) {
    super(_http)
  }


  interfaceToModelAbstract(data: SvCrudSchema): CrudModel {
    return new CrudModel(data)
  }
}
