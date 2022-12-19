import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toGuardarRol(){
    this.router.navigate(['/capturaRol']);
  }

  toModificarRol(){
    this.router.navigate(['/modificaRol']);
  }

  toInicio(){
    this.router.navigate(['/login']);
  }

  toConsultaRoles(){
    this.router.navigate(['/consultaRol']);
  }

  toEliminaRoles(){
    this.router.navigate(['/eliminaRol']);
  }

  toGuardarUser(){
    this.router.navigate(['/capturaUser']);
  }

  toModificarUser(){
    this.router.navigate(['/modificaUser']);
  }

  toConsultarUsers(){
    this.router.navigate(['/consultaUser']);
  }

  toEliminarUser(){
    this.router.navigate(['/eliminaUser']);
  }

}
