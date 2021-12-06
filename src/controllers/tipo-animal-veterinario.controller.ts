import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  TipoAnimal,
  Veterinario,
} from '../models';
import {TipoAnimalRepository} from '../repositories';

export class TipoAnimalVeterinarioController {
  constructor(
    @repository(TipoAnimalRepository)
    public tipoAnimalRepository: TipoAnimalRepository,
  ) { }

  @get('/tipo-animals/{id}/veterinario', {
    responses: {
      '200': {
        description: 'Veterinario belonging to TipoAnimal',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Veterinario)},
          },
        },
      },
    },
  })
  async getVeterinario(
    @param.path.string('id') id: typeof TipoAnimal.prototype.id,
  ): Promise<Veterinario> {
    return this.tipoAnimalRepository.veterinario(id);
  }
}
