import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MonedaModel as CrudModel, SvMonedaSchema as SvCrudSchema} from './monedas.interface';
import { environment } from 'environments/environment';
import { ListServiceAbstract } from 'app/shared/components/list-base/list-base-service.abstract';

@Injectable({
  providedIn: 'root'
})
export class MonedasService extends ListServiceAbstract<CrudModel, SvCrudSchema>{
  url = environment.url+'/api/monedas'


  interfaceToModelAbstract(data: SvCrudSchema): CrudModel {
    return new CrudModel(data)
  }
}
