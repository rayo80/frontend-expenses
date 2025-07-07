import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PurchasesDetailModel as CrudModel, SvPurchaseDetailSchema as SvCrudSchema} from './purchases.interface';
import { environment } from 'environments/environment';
import { ListServiceAbstract } from 'app/shared/components/list-base/list-base-service.abstract';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService extends ListServiceAbstract<CrudModel, SvCrudSchema>{
  url = environment.url+'/api/purchases'


  interfaceToModelAbstract(data: SvCrudSchema): CrudModel {
    return new CrudModel(data)
  }
}
