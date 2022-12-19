import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as dataConst from '../../util/constantes';


@Injectable({
  providedIn: 'root'
})
export class RestServiceService {

  constructor(private http: HttpClient) {
   }

   

   consumeApiPost(jsonRequest: Object, capacidad: String){
    let headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'TKNA...' });

    let options = { headers: headers };

    return this.http.post<dataConst.Config>(dataConst.HOST_WS+dataConst.PATH_WS+capacidad, jsonRequest, options);
   }
  

}
