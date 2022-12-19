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
  selector: 'app-guardar-rol',
  templateUrl: './guardar-rol.component.html',
  styleUrls: ['./guardar-rol.component.css']
})
export class GuardarRolComponent implements OnInit {

  @ViewChild("myModalInfo", {static: false}) myModalInfo!: TemplateRef<any>;
  @ViewChild("myModalError", {static: false}) myModalError!: TemplateRef<any>;
 

  public formGRol!: FormGroup;

  constructor(private restService: RestServiceService,
    private SpinnerService: NgxSpinnerService,
    private modalService: NgbModal) { }

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

  createFormRol(){
    this.formGRol = new FormGroup({
      nombreRol: new FormControl(""),
      descRol: new FormControl(""),
    });
   }

  ngOnInit(): void {
    this.createFormRol();
  }

  guardarRol(){
    this.SpinnerService.show();
    
    let jsonRequest ={
      nombreRol:  this.formGRol.value.nombreRol,
      descripcionRol:this.formGRol.value.descRol
    }
      
    this.restService.consumeApiPost(jsonRequest, dataConst.CAPACIDAD_GUARDAR_ROL)
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
