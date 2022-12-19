import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IconSetService } from '@coreui/icons-angular';
import {  cilUser } from '@coreui/icons';
import {FormGroup, FormControl} from '@angular/forms';
import { RestServiceService } from 'src/app/services/rest-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap'; 
import * as dataConst from '../../../util/constantes';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs';

const ngbModalOptions: NgbModalOptions = {
  backdrop : 'static',
  keyboard : false
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild("myModalInfo", {static: false}) myModalInfo!: TemplateRef<any>;
  @ViewChild("myModalError", {static: false}) myModalError!: TemplateRef<any>;
 
  public mensajeModal:String = "";
  public mensajeLogin:String = "";


  public formLogin!: FormGroup;

  constructor(private router: Router, 
              public iconSet: IconSetService,
              private restService: RestServiceService,
              private SpinnerService: NgxSpinnerService,
              private modalService: NgbModal) {
      iconSet.icons = { cilUser };
   }

   

  ngOnInit(): void {
    this.createFormLogin();
  }

  createFormLogin(){
    this.formLogin = new FormGroup({
      user: new FormControl(""),
      pass: new FormControl("")
    });
   }
  
  mostrarModalInfo(){
    this.modalService.open(this.myModalInfo,ngbModalOptions);
    setTimeout(() => {
      this.modalService.dismissAll('auto');
      window.location.reload();
    }, 5000);
   
  }

  mostrarModalError(){
    this.modalService.open(this.myModalError,ngbModalOptions);
    setTimeout(() => {
      this.modalService.dismissAll('auto');
    }, 3000);
   
  }


  iniciaSesion(){
    
    this.SpinnerService.show();
    
    let jsonRequest ={
      user :  this.formLogin.value.user,
      pass :this.formLogin.value.pass
    }
      
    this.restService.consumeApiPost(jsonRequest, dataConst.CAPACIDAD_LOGIN)
                  .pipe( catchError(err => { 
                                      this.SpinnerService.hide();
                                      this.mostrarModalError();
                                      return throwError(() => new Error(err));
                                    })
                   ).subscribe((resp)=>{
                        if(resp.code == dataConst.CODE_EXITO){
                            
                            this.mensajeLogin = "Inicio de sesión exitoso para "+resp.data.nombreUsuario+" con correo "+resp.data.email;

                            this.SpinnerService.hide();
                            this.mostrarModalInfo();
                        }else{
                          
                          if(resp.message != null)
                            this.mensajeModal = resp.message;
                          
                          this.SpinnerService.hide();
                          this.mostrarModalError();
                        }
                    });
  }

}
