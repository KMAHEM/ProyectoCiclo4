import {belongsTo, hasOne, model, property} from '@loopback/repository';
import {Persona} from '.';
import {CentroVeterinario} from './centro-veterinario.model';
import {ProgramarVisita} from './programar-visita.model';
import {VisitaMedico} from './visita-medico.model';

@model()
export class Veterinario extends Persona {
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
  TarjetaProfesional: string;

  @property({
    type: 'string',
    required: true,
  })
  Correo: string;

  @property({
    type: 'string',
    required: false,
  })
  clave: string;

  @belongsTo(() => CentroVeterinario)
  centroVeterinarioId: string;

  @hasOne(() => ProgramarVisita)
  programarVisita: ProgramarVisita;

  @hasOne(() => VisitaMedico)
  visitaMedico: VisitaMedico;

  constructor(data?: Partial<Veterinario>) {
    super(data);
  }
}

export interface VeterinarioRelations {
  // describe navigational properties here
}

export type VeterinarioWithRelations = Veterinario & VeterinarioRelations;
