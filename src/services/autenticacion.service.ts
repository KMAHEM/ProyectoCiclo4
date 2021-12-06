import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Propietario, Veterinario} from '../models';
import {PropietarioRepository, VeterinarioRepository} from '../repositories';

const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(PropietarioRepository)
    public propietarioRePository: PropietarioRepository,
    @repository(VeterinarioRepository)
    public veterinarioRepository: VeterinarioRepository
  ) { }

  /*
   * Add service methods here
   */

  GenerarClave() {
    let clave = generador(8, false);
    return clave;
  }

  CifrarClave(clave: string) {
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  IdentificarPropietario(usuario: string, clave: string) {

    try {
      let p = this.propietarioRePository.findOne({where: {Correo: usuario, Clave: clave}});
      if (p) {
        return p;
      }
      return false
    } catch {
      return false;

    }

  }

  GenerarTokenJWT(propietario: Propietario) {
    let token = jwt.sign({
      data: {
        id: propietario.id,
        correo: propietario.Correo,
        nombre: propietario.Nombres + " " + propietario.Apellidos
      }
    },
      Llaves.claveJWT);
    return token;
  }

  validarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    } catch {
      return false;
    }
  }


  IdentificarVeterinario(usuario: string, clave: string) {

    try {
      let v = this.veterinarioRepository.findOne({where: {Correo: usuario, clave: clave}});
      if (v) {
        return v;
      }
      return false
    } catch {
      return false;

    }

  }


  GenerarTokenVeterianrio(Veterinario: Veterinario) {
    let token = jwt.sign({
      data: {
        id: Veterinario.id,
        correo: Veterinario.Correo,
        nombre: Veterinario.Nombres + " " + Veterinario.Apellidos
      }

    },
      Llaves.claveJWT);
    return token;
  }

  validarTokenVeterinario(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    } catch {
      return false;
    }
  }

}
