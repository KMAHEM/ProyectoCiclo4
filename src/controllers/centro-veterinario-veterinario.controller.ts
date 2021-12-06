import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  CentroVeterinario,
  Veterinario,
} from '../models';
import {CentroVeterinarioRepository} from '../repositories';

export class CentroVeterinarioVeterinarioController {
  constructor(
    @repository(CentroVeterinarioRepository) protected centroVeterinarioRepository: CentroVeterinarioRepository,
  ) { }

  @get('/centro-veterinarios/{id}/veterinarios', {
    responses: {
      '200': {
        description: 'Array of CentroVeterinario has many Veterinario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Veterinario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Veterinario>,
  ): Promise<Veterinario[]> {
    return this.centroVeterinarioRepository.veterinarios(id).find(filter);
  }

  @post('/centro-veterinarios/{id}/veterinarios', {
    responses: {
      '200': {
        description: 'CentroVeterinario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Veterinario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof CentroVeterinario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veterinario, {
            title: 'NewVeterinarioInCentroVeterinario',
            exclude: ['id'],
            optional: ['centroVeterinarioId']
          }),
        },
      },
    }) veterinario: Omit<Veterinario, 'id'>,
  ): Promise<Veterinario> {
    return this.centroVeterinarioRepository.veterinarios(id).create(veterinario);
  }

  @patch('/centro-veterinarios/{id}/veterinarios', {
    responses: {
      '200': {
        description: 'CentroVeterinario.Veterinario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veterinario, {partial: true}),
        },
      },
    })
    veterinario: Partial<Veterinario>,
    @param.query.object('where', getWhereSchemaFor(Veterinario)) where?: Where<Veterinario>,
  ): Promise<Count> {
    return this.centroVeterinarioRepository.veterinarios(id).patch(veterinario, where);
  }

  @del('/centro-veterinarios/{id}/veterinarios', {
    responses: {
      '200': {
        description: 'CentroVeterinario.Veterinario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Veterinario)) where?: Where<Veterinario>,
  ): Promise<Count> {
    return this.centroVeterinarioRepository.veterinarios(id).delete(where);
  }
}
