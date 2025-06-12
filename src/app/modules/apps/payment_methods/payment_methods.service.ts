import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConstantsModel as CrudModel, SvConstantsSchema as SvCrudSchema} from './payment_methods.interface';
import { environment } from 'environments/environment';
import { ListServiceAbstract } from 'app/shared/components/list-base/list-base-service.abstract';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodsService extends ListServiceAbstract<CrudModel, SvCrudSchema>{
  url = environment.url+'/api/constants?table=METHODS'


  constructor(_http: HttpClient) {
    super(_http)
  }


  interfaceToModelAbstract(data: SvCrudSchema): CrudModel {
    return new CrudModel(data)
  }
}
