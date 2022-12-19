export const HOST_WS = 'http://localhost:8080';
export const PATH_WS ='/ws';

export const CAPACIDAD_GUARDAR_ROL ='/saveRol';
export const CAPACIDAD_OBTENER_ROLES ='/obtainRoles';
export const CAPACIDAD_MODIFICAR_ROL ='/updateRol';
export const CAPACIDAD_ELIMINAR_ROL ='/deleteRol';

export const CAPACIDAD_GUARDAR_USER ='/saveUsuario';
export const CAPACIDAD_OBTENER_USERS ='/obtainUsuarios';
export const CAPACIDAD_MODIFICAR_USER ='/updateUsuario';
export const CAPACIDAD_ELIMINAR_USER ='/deleteUsuario';
export const CAPACIDAD_LOGIN = "/loginUser";

export const CODE_EXITO = 200;

export interface Config {
    ws: {
        version: String,
        descripcion: String,
        actualizacion: String
    },
    code: Number,
    status: String,
    message: String,
    data: any
  }

  export class role {
    idRol: Number;
    nombreRol: String;
    descripcionRol: String;

    constructor(idRol: Number,
        nombreRol: String,
        descripcionRol: String){
            this.idRol = idRol;
            this.nombreRol = nombreRol;
            this.descripcionRol = descripcionRol;
        }
  }

  export class User {
    idUsuario: Number;
    idRol: Number;
    nombreUsuario: String;
    email: String;
    password: String;

    constructor(idUsuario: Number,
        idRol: Number,
        nombreUsuario: String,
        email: String,
        password: String){
            this.idUsuario = idUsuario,
            this.idRol = idRol,
            this.nombreUsuario = nombreUsuario,
            this.email = email,
            this.password = password
        }
  }