import {Entity, model, property, hasOne} from '@loopback/repository';
import {ProgramarVisita} from './programar-visita.model';
import {VisitaMedico} from './visita-medico.model';

@model()
export class Mascotas extends Entity {
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
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  ColorOjos: string;

  @property({
    type: 'string',
    required: true,
  })
  ColorPiel: string;

  @property({
    type: 'number',
    required: true,
  })
  Estatura: number;

  @property({
    type: 'string',
    required: true,
  })
  Raza: string;

  @property({
    type: 'string',
  })
  propietarioId?: string;

  @property({
    type: 'string',
  })
  tipoAnimalId?: string;

  @hasOne(() => ProgramarVisita)
  programarVisita: ProgramarVisita;

  @hasOne(() => VisitaMedico)
  visitaMedico: VisitaMedico;

  constructor(data?: Partial<Mascotas>) {
    super(data);
  }
}

export interface MascotasRelations {
  // describe navigational properties here
}

export type MascotasWithRelations = Mascotas & MascotasRelations;
