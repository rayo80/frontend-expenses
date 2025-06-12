import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PaymentModel as CrudModel, SvPaymentSchema as SvCrudSchema} from './payments.interface';
import { environment } from 'environments/environment';
import { ListServiceAbstract } from 'app/shared/components/list-base/list-base-service.abstract';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService extends ListServiceAbstract<CrudModel, SvCrudSchema>{
  url = environment.url+'/api/payments'


  constructor(_http: HttpClient) {
    super(_http)
  }


  interfaceToModelAbstract(data: SvCrudSchema): CrudModel {
    return new CrudModel(data)
  }
}
