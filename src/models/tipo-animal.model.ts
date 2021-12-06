import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Veterinario} from './veterinario.model';
import {Mascotas} from './mascotas.model';
import {ProgramarVisita} from './programar-visita.model';

@model()
export class TipoAnimal extends Entity {
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
  claseAnimal: string;

  @belongsTo(() => Veterinario)
  veterinarioId: string;

  @hasOne(() => Mascotas)
  mascotas: Mascotas;

  @hasOne(() => ProgramarVisita)
  programarVisita: ProgramarVisita;

  constructor(data?: Partial<TipoAnimal>) {
    super(data);
  }
}

export interface TipoAnimalRelations {
  // describe navigational properties here
}

export type TipoAnimalWithRelations = TipoAnimal & TipoAnimalRelations;
