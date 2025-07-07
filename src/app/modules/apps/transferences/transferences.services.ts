import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TransferenceModel as CrudModel, SvTransferenceSchema as SvCrudSchema} from './transferences.interface';
import { environment } from 'environments/environment';
import { ListServiceAbstract } from 'app/shared/components/list-base/list-base-service.abstract';

@Injectable({
  providedIn: 'root'
})
export class TransferenceService extends ListServiceAbstract<CrudModel, SvCrudSchema>{
  url = environment.url+'/api/transferencias'


  // constructor(_http: HttpClient) {
  //   super(_http)
  // }


  interfaceToModelAbstract(data: SvCrudSchema): CrudModel {
    return new CrudModel(data)
  }
}
