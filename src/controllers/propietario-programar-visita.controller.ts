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
  Propietario,
  ProgramarVisita,
} from '../models';
import {PropietarioRepository} from '../repositories';

export class PropietarioProgramarVisitaController {
  constructor(
    @repository(PropietarioRepository) protected propietarioRepository: PropietarioRepository,
  ) { }

  @get('/propietarios/{id}/programar-visita', {
    responses: {
      '200': {
        description: 'Propietario has one ProgramarVisita',
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
    return this.propietarioRepository.programarVisita(id).get(filter);
  }

  @post('/propietarios/{id}/programar-visita', {
    responses: {
      '200': {
        description: 'Propietario model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProgramarVisita)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Propietario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProgramarVisita, {
            title: 'NewProgramarVisitaInPropietario',
            exclude: ['id'],
            optional: ['propietarioId']
          }),
        },
      },
    }) programarVisita: Omit<ProgramarVisita, 'id'>,
  ): Promise<ProgramarVisita> {
    return this.propietarioRepository.programarVisita(id).create(programarVisita);
  }

  @patch('/propietarios/{id}/programar-visita', {
    responses: {
      '200': {
        description: 'Propietario.ProgramarVisita PATCH success count',
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
    return this.propietarioRepository.programarVisita(id).patch(programarVisita, where);
  }

  @del('/propietarios/{id}/programar-visita', {
    responses: {
      '200': {
        description: 'Propietario.ProgramarVisita DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ProgramarVisita)) where?: Where<ProgramarVisita>,
  ): Promise<Count> {
    return this.propietarioRepository.programarVisita(id).delete(where);
  }
}
