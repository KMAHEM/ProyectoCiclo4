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
  VisitaMedico,
} from '../models';
import {MascotasRepository} from '../repositories';

export class MascotasVisitaMedicoController {
  constructor(
    @repository(MascotasRepository) protected mascotasRepository: MascotasRepository,
  ) { }

  @get('/mascotas/{id}/visita-medico', {
    responses: {
      '200': {
        description: 'Mascotas has one VisitaMedico',
        content: {
          'application/json': {
            schema: getModelSchemaRef(VisitaMedico),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<VisitaMedico>,
  ): Promise<VisitaMedico> {
    return this.mascotasRepository.visitaMedico(id).get(filter);
  }

  @post('/mascotas/{id}/visita-medico', {
    responses: {
      '200': {
        description: 'Mascotas model instance',
        content: {'application/json': {schema: getModelSchemaRef(VisitaMedico)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascotas.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitaMedico, {
            title: 'NewVisitaMedicoInMascotas',
            exclude: ['id'],
            optional: ['mascotasId']
          }),
        },
      },
    }) visitaMedico: Omit<VisitaMedico, 'id'>,
  ): Promise<VisitaMedico> {
    return this.mascotasRepository.visitaMedico(id).create(visitaMedico);
  }

  @patch('/mascotas/{id}/visita-medico', {
    responses: {
      '200': {
        description: 'Mascotas.VisitaMedico PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitaMedico, {partial: true}),
        },
      },
    })
    visitaMedico: Partial<VisitaMedico>,
    @param.query.object('where', getWhereSchemaFor(VisitaMedico)) where?: Where<VisitaMedico>,
  ): Promise<Count> {
    return this.mascotasRepository.visitaMedico(id).patch(visitaMedico, where);
  }

  @del('/mascotas/{id}/visita-medico', {
    responses: {
      '200': {
        description: 'Mascotas.VisitaMedico DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(VisitaMedico)) where?: Where<VisitaMedico>,
  ): Promise<Count> {
    return this.mascotasRepository.visitaMedico(id).delete(where);
  }
}
