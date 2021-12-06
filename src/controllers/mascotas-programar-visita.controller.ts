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
  Mascotas,
  ProgramarVisita,
} from '../models';
import {MascotasRepository} from '../repositories';

export class MascotasProgramarVisitaController {
  constructor(
    @repository(MascotasRepository) protected mascotasRepository: MascotasRepository,
  ) { }

  @get('/mascotas/{id}/programar-visita', {
    responses: {
      '200': {
        description: 'Mascotas has one ProgramarVisita',
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
    return this.mascotasRepository.programarVisita(id).get(filter);
  }

  @post('/mascotas/{id}/programar-visita', {
    responses: {
      '200': {
        description: 'Mascotas model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProgramarVisita)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascotas.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProgramarVisita, {
            title: 'NewProgramarVisitaInMascotas',
            exclude: ['id'],
            optional: ['mascotasId']
          }),
        },
      },
    }) programarVisita: Omit<ProgramarVisita, 'id'>,
  ): Promise<ProgramarVisita> {
    return this.mascotasRepository.programarVisita(id).create(programarVisita);
  }

  @patch('/mascotas/{id}/programar-visita', {
    responses: {
      '200': {
        description: 'Mascotas.ProgramarVisita PATCH success count',
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
    return this.mascotasRepository.programarVisita(id).patch(programarVisita, where);
  }

  @del('/mascotas/{id}/programar-visita', {
    responses: {
      '200': {
        description: 'Mascotas.ProgramarVisita DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ProgramarVisita)) where?: Where<ProgramarVisita>,
  ): Promise<Count> {
    return this.mascotasRepository.programarVisita(id).delete(where);
  }
}
