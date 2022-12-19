import { Component,OnInit, ViewChild, TemplateRef } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RestServiceService } from './services/rest-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';  

const ngbModalOptions: NgbModalOptions = {
  backdrop : 'static',
  keyboard : false
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{
  title = 'frontNiss-gen';
  @ViewChild("myModalInfo", {static: false}) myModalInfo!: TemplateRef<any>;
  @ViewChild("myModalConf", {static: false}) myModalConf!: TemplateRef<any>;
  public form!: FormGroup;

  
  constructor( private formBuilder: FormBuilder,
                private restService: RestServiceService,
                private SpinnerService: NgxSpinnerService,
                private modalService: NgbModal){

  }

  ngOnInit(): void {
   this.form = this.formBuilder.group({
      nombreRol:['',[Validators.required,Validators.email]],
      descRol:['',Validators.required],
      rolActivo:['',Validators.required],
      rolSesion:['',Validators.required]
    });

  }
  
  send():any{
    this.SpinnerService.show();  
    console.log(this.form.value)
    let jsonRequest ={
      nombreRol:  this.form.value.nombreRol,
      descripcionRol:this.form.value.descRol,
      rolActivo:this.form.value.rolActivo,
      rolActivoSesion:this.form.value.rolSesion,
    }

    this.restService.consumeApiPost(jsonRequest,"").subscribe(resp=>{
      console.log(resp);
      //this.SpinnerService.hide();  
    });

    setTimeout(() => {
      this.SpinnerService.hide();
      this.mostrarModalInfo();
    }, 3000);

  }

  mostrarModalInfo(){
    this.modalService.open(this.myModalInfo,ngbModalOptions);
    setTimeout(() => {
      this.modalService.dismissAll('auto');
    }, 3000);
   
  }
 
  mostrarModalConf(){
    this.modalService.open(this.myModalConf, ngbModalOptions).result.then( r => {
      console.log("Tu respuesta ha sido: " + r);
      window.location.reload()
    }, error => {
      console.log(error);
    });
  }

}
