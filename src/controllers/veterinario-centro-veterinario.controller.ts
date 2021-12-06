import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Veterinario,
  CentroVeterinario,
} from '../models';
import {VeterinarioRepository} from '../repositories';

export class VeterinarioCentroVeterinarioController {
  constructor(
    @repository(VeterinarioRepository)
    public veterinarioRepository: VeterinarioRepository,
  ) { }

  @get('/veterinarios/{id}/centro-veterinario', {
    responses: {
      '200': {
        description: 'CentroVeterinario belonging to Veterinario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CentroVeterinario)},
          },
        },
      },
    },
  })
  async getCentroVeterinario(
    @param.path.string('id') id: typeof Veterinario.prototype.id,
  ): Promise<CentroVeterinario> {
    return this.veterinarioRepository.centroVeterinario(id);
  }
}
