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
  VisitaMedico,
} from '../models';
import {VeterinarioRepository} from '../repositories';

export class VeterinarioVisitaMedicoController {
  constructor(
    @repository(VeterinarioRepository) protected veterinarioRepository: VeterinarioRepository,
  ) { }

  @get('/veterinarios/{id}/visita-medico', {
    responses: {
      '200': {
        description: 'Veterinario has one VisitaMedico',
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
    return this.veterinarioRepository.visitaMedico(id).get(filter);
  }

  @post('/veterinarios/{id}/visita-medico', {
    responses: {
      '200': {
        description: 'Veterinario model instance',
        content: {'application/json': {schema: getModelSchemaRef(VisitaMedico)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Veterinario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitaMedico, {
            title: 'NewVisitaMedicoInVeterinario',
            exclude: ['id'],
            optional: ['veterinarioId']
          }),
        },
      },
    }) visitaMedico: Omit<VisitaMedico, 'id'>,
  ): Promise<VisitaMedico> {
    return this.veterinarioRepository.visitaMedico(id).create(visitaMedico);
  }

  @patch('/veterinarios/{id}/visita-medico', {
    responses: {
      '200': {
        description: 'Veterinario.VisitaMedico PATCH success count',
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
    return this.veterinarioRepository.visitaMedico(id).patch(visitaMedico, where);
  }

  @del('/veterinarios/{id}/visita-medico', {
    responses: {
      '200': {
        description: 'Veterinario.VisitaMedico DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(VisitaMedico)) where?: Where<VisitaMedico>,
  ): Promise<Count> {
    return this.veterinarioRepository.visitaMedico(id).delete(where);
  }
}
