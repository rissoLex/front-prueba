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
  selector: 'app-modificar-user',
  templateUrl: './modificar-user.component.html',
  styleUrls: ['./modificar-user.component.css']
})
export class ModificarUserComponent implements OnInit {

  @ViewChild("myModalInfo", {static: false}) myModalInfo!: TemplateRef<any>;
  @ViewChild("myModalError", {static: false}) myModalError!: TemplateRef<any>;
  public dataRoles:dataConst.role[] = [];
  rolselected!:dataConst.role;
  public formGUser!: FormGroup;
  public showPassword: boolean = false;

  public dataUsuarios:dataConst.User[] = [];
  usuarioSelected!:dataConst.User;

  constructor(private restService: RestServiceService,
    private SpinnerService: NgxSpinnerService,
    private modalService: NgbModal) { }

    ngOnInit(): void {
      this.createFormRol();
      this.cargaDatosUsuarios();
    }

    mostrarModalInfo(){
      this.modalService.open(this.myModalInfo,ngbModalOptions);
      setTimeout(() => {
        this.modalService.dismissAll('auto');
        window.location.reload();
      }, 3000);
     
    }
    cargaDatosUsuarios(){
      this.startLoading();
      let jsonRequest ={
        tipoRol:  ""
      }
        
      this.restService.consumeApiPost(jsonRequest, dataConst.CAPACIDAD_OBTENER_USERS)
                    .pipe( catchError(err => { 
                                        this.endLoading();
                                        this.mostrarModalError();
                                        return throwError(() => new Error(err));
                                      })
                     ).subscribe((resp)=>{
                          if(resp.code == dataConst.CODE_EXITO){
                              this.dataUsuarios= resp.data;
                              this.dataUsuarios.unshift(new dataConst.User(0,0,"--Seleccione un usuario--","",""));
                              this.endLoading();
                          }else{
                            this.endLoading();
                            this.mostrarModalError();
                          }
                      });
    }

    cargarDataRoles(userSelec: dataConst.User){
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
                              this.formGUser = new FormGroup({
                                rolsel: new FormControl(userSelec.idRol),
                                nombreUser: new FormControl(userSelec.nombreUsuario),
                                email: new FormControl(userSelec.email),
                                pass: new FormControl(userSelec.password),
                              });
                              let rolSelec  = this.dataRoles.filter(rol => rol.idRol == userSelec.idRol)[0];
                              this.rolselected = rolSelec;
  
                              this.endLoading();
                          }else{
                            this.endLoading();
                            this.mostrarModalError();
                          }
                      });
    }

    onChangeRolSelected(lang:any){
      this.startLoading();
      let rolSelec  = this.dataRoles.filter(rol => rol.idRol == lang.target.value)[0];
      this.rolselected = rolSelec;
      this.endLoading();
    }

    onChangeUserSelected(lang:any){
      this.startLoading();
      let userSelec  = this.dataUsuarios.filter(user => user.idUsuario == lang.target.value)[0];
      this.usuarioSelected = userSelec;
      this.cargarDataRoles(userSelec);
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
  
  
    createFormRol(){
      this.formGUser = new FormGroup({
        rolsel: new FormControl(""),
        nombreUser: new FormControl(""),
        email: new FormControl(""),
        pass: new FormControl(""),
      });
     }
  
    guardarUser(){
      this.SpinnerService.show();
      
      let jsonRequest ={
        idUsuario: this.usuarioSelected.idUsuario,
        idRol:  this.rolselected.idRol,
        nombreUsuario: this.formGUser.value.nombreUser,
        email: this.formGUser.value.email,
        password: this.formGUser.value.pass
      }
        
      this.restService.consumeApiPost(jsonRequest, dataConst.CAPACIDAD_MODIFICAR_USER)
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
