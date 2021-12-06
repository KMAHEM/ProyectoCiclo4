import {Entity, model, property} from '@loopback/repository';

@model()
export class ProgramarVisita extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  FechaSolicitud: string;

  @property({
    type: 'string',
  })
  mascotasId?: string;

  @property({
    type: 'string',
  })
  propietarioId?: string;

  @property({
    type: 'string',
  })
  tipoAnimalId?: string;

  @property({
    type: 'string',
  })
  veterinarioId?: string;

  constructor(data?: Partial<ProgramarVisita>) {
    super(data);
  }
}

export interface ProgramarVisitaRelations {
  // describe navigational properties here
}

export type ProgramarVisitaWithRelations = ProgramarVisita & ProgramarVisitaRelations;
