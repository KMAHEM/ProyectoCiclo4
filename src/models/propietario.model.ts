import {hasMany, hasOne, model, property} from '@loopback/repository';
import {Persona} from '.';
import {Mascotas} from './mascotas.model';
import {ProgramarVisita} from './programar-visita.model';

@model()
export class Propietario extends Persona {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  Correo: string;

  @property({
    type: 'string',
    required: false,
  })
  Clave: string;

  @hasMany(() => Mascotas)
  mascotas: Mascotas[];

  @hasOne(() => ProgramarVisita)
  programarVisita: ProgramarVisita;

  constructor(data?: Partial<Propietario>) {
    super(data);
  }
}

export interface PropietarioRelations {
  // describe navigational properties here
}

export type PropietarioWithRelations = Propietario & PropietarioRelations;
