import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
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
  selector: 'app-eliminar-rol',
  templateUrl: './eliminar-rol.component.html',
  styleUrls: ['./eliminar-rol.component.css']
})
export class EliminarRolComponent implements OnInit {

  @ViewChild("myModalInfo", {static: false}) myModalInfo!: TemplateRef<any>;
  @ViewChild("myModalError", {static: false}) myModalError!: TemplateRef<any>;
  public formGRol!: FormGroup;
  public dataRoles:dataConst.role[] = [];
  rolselected!:dataConst.role;
  inDisabled = true;

  constructor(private restService: RestServiceService,
    private SpinnerService: NgxSpinnerService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.createFormRol();
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
                            this.dataRoles.unshift(new dataConst.role(0,"--Seleccione un rol--",""));

                            this.endLoading();
                        }else{
                          this.endLoading();
                          this.mostrarModalError();
                        }
                    });
  }

  createFormRol(){
    this.formGRol = new FormGroup({
      nombreRol: new FormControl({value:'', disabled:true}),
      descRol: new FormControl({value:'', disabled:true}),
    });

  
   }

   onChangeRolSelected(lang:any){
    this.startLoading();
    let rolSelec  = this.dataRoles.filter(rol => rol.idRol == lang.target.value)[0];
    this.rolselected = rolSelec;

    this.formGRol = new FormGroup({
      nombreRol: new FormControl({value:rolSelec.nombreRol, disabled:true}),
      descRol: new FormControl({value:rolSelec.descripcionRol, disabled:true}),
    });
    this.endLoading();
  }

   mostrarModalInfo(){
    this.modalService.open(this.myModalInfo,ngbModalOptions);
    setTimeout(() => {
      this.modalService.dismissAll('auto');
      window.location.reload();
    }, 3000);
   
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

  eliminarRol(){
    this.SpinnerService.show();  

    let jsonRequest ={
      idRol:this.rolselected.idRol,
      nombreRol:  this.formGRol.value.nombreRol,
      descripcionRol:this.formGRol.value.descRol
    }
      
    this.restService.consumeApiPost(jsonRequest, dataConst.CAPACIDAD_ELIMINAR_ROL)
                  .pipe( catchError(err => { 
                                      this.SpinnerService.hide();
                                      this.mostrarModalError();
                                      return throwError(() => new Error(err));
                                    })
                   ).subscribe((resp)=>{
                        if(resp.code == dataConst.CODE_EXITO){
                            this.SpinnerService.hide();
                            this.mostrarModalInfo();
                        }else{
                          this.SpinnerService.hide();
                          this.mostrarModalError();
                        }
                    });
  }

}
