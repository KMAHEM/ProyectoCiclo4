import {Entity, model, property} from '@loopback/repository';

@model()
export class VisitaMedico extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  Temperatura: number;

  @property({
    type: 'number',
    required: true,
  })
  Peso: number;

  @property({
    type: 'number',
    required: true,
  })
  FrecRespiratoria: number;

  @property({
    type: 'string',
    required: true,
  })
  EstadoDeAnimo: string;

  @property({
    type: 'date',
    required: true,
  })
  FechaVisita: string;

  @property({
    type: 'string',
    required: true,
  })
  Recomendaciones: string;

  @property({
    type: 'string',
  })
  veterinarioId?: string;

  @property({
    type: 'string',
  })
  mascotasId?: string;

  constructor(data?: Partial<VisitaMedico>) {
    super(data);
  }
}

export interface VisitaMedicoRelations {
  // describe navigational properties here
}

export type VisitaMedicoWithRelations = VisitaMedico & VisitaMedicoRelations;
