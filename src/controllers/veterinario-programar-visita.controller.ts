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
  Veterinario,
  ProgramarVisita,
} from '../models';
import {VeterinarioRepository} from '../repositories';

export class VeterinarioProgramarVisitaController {
  constructor(
    @repository(VeterinarioRepository) protected veterinarioRepository: VeterinarioRepository,
  ) { }

  @get('/veterinarios/{id}/programar-visita', {
    responses: {
      '200': {
        description: 'Veterinario has one ProgramarVisita',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ProgramarVisita),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ProgramarVisita>,
  ): Promise<ProgramarVisita> {
    return this.veterinarioRepository.programarVisita(id).get(filter);
  }

  @post('/veterinarios/{id}/programar-visita', {
    responses: {
      '200': {
        description: 'Veterinario model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProgramarVisita)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Veterinario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProgramarVisita, {
            title: 'NewProgramarVisitaInVeterinario',
            exclude: ['id'],
            optional: ['veterinarioId']
          }),
        },
      },
    }) programarVisita: Omit<ProgramarVisita, 'id'>,
  ): Promise<ProgramarVisita> {
    return this.veterinarioRepository.programarVisita(id).create(programarVisita);
  }

  @patch('/veterinarios/{id}/programar-visita', {
    responses: {
      '200': {
        description: 'Veterinario.ProgramarVisita PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProgramarVisita, {partial: true}),
        },
      },
    })
    programarVisita: Partial<ProgramarVisita>,
    @param.query.object('where', getWhereSchemaFor(ProgramarVisita)) where?: Where<ProgramarVisita>,
  ): Promise<Count> {
    return this.veterinarioRepository.programarVisita(id).patch(programarVisita, where);
  }

  @del('/veterinarios/{id}/programar-visita', {
    responses: {
      '200': {
        description: 'Veterinario.ProgramarVisita DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ProgramarVisita)) where?: Where<ProgramarVisita>,
  ): Promise<Count> {
    return this.veterinarioRepository.programarVisita(id).delete(where);
  }
}
