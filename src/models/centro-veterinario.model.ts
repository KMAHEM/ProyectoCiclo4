import {Entity, model, property, hasMany} from '@loopback/repository';
import {Veterinario} from './veterinario.model';

@model()
export class CentroVeterinario extends Entity {
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
  NIT: string;

  @property({
    type: 'string',
    required: true,
  })
  Direccion: string;

  @hasMany(() => Veterinario)
  veterinarios: Veterinario[];

  constructor(data?: Partial<CentroVeterinario>) {
    super(data);
  }
}

export interface CentroVeterinarioRelations {
  // describe navigational properties here
}

export type CentroVeterinarioWithRelations = CentroVeterinario & CentroVeterinarioRelations;
