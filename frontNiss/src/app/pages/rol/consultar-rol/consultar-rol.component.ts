import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { RestServiceService } from 'src/app/services/rest-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap'; 
import * as dataConst from '../../../../util/constantes';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs';


const ngbModalOptions: NgbModalOptions = {
  backdrop : 'static',
  keyboard : false
};

@Component({
  selector: 'app-consultar-rol',
  templateUrl: './consultar-rol.component.html',
  styleUrls: ['./consultar-rol.component.css']
})
export class ConsultarRolComponent implements OnInit {

  @ViewChild("myModalInfo", {static: false}) myModalInfo!: TemplateRef<any>;
  @ViewChild("myModalError", {static: false}) myModalError!: TemplateRef<any>;
  public dataRoles:dataConst.role[] = [];

  constructor(private restService: RestServiceService,
    private SpinnerService: NgxSpinnerService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.cargarDataRoles();
  }
  

  cargarDataRoles(){
    this.startLoading();
    let jsonRequest ={
      tipoRol:  ""
    }
      
    this.restService.consumeApiPost(jsonRequest, dataConst.CAPACIDAD_OBTENER_ROLES)
                  .pipe( catchError(err => { 
                                      this.endLoading();
                                      this.mostrarModalError();
                                      return throwError(() => new Error(err));
                                    })
                   ).subscribe((resp)=>{
                        if(resp.code == dataConst.CODE_EXITO){
                            this.dataRoles= resp.data;

                            this.endLoading();
                        }else{
                          this.endLoading();
                          this.mostrarModalError();
                        }
                    });
  }

  mostrarModalError(){
    this.modalService.open(this.myModalError,ngbModalOptions);
    setTimeout(() => {
      this.modalService.dismissAll('auto');
    }, 3000);
   
  }

  startLoading(){
    this.SpinnerService.show();
  }

  endLoading(){
    this.SpinnerService.hide();
  }

}
