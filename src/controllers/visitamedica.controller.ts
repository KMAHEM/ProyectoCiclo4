import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {VisitaMedico} from '../models';
import {VisitaMedicoRepository} from '../repositories';

export class VisitamedicaController {
  constructor(
    @repository(VisitaMedicoRepository)
    public visitaMedicoRepository : VisitaMedicoRepository,
  ) {}

  @post('/visita-medicos')
  @response(200, {
    description: 'VisitaMedico model instance',
    content: {'application/json': {schema: getModelSchemaRef(VisitaMedico)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitaMedico, {
            title: 'NewVisitaMedico',
            exclude: ['id'],
          }),
        },
      },
    })
    visitaMedico: Omit<VisitaMedico, 'id'>,
  ): Promise<VisitaMedico> {
    return this.visitaMedicoRepository.create(visitaMedico);
  }

  @get('/visita-medicos/count')
  @response(200, {
    description: 'VisitaMedico model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(VisitaMedico) where?: Where<VisitaMedico>,
  ): Promise<Count> {
    return this.visitaMedicoRepository.count(where);
  }

  @get('/visita-medicos')
  @response(200, {
    description: 'Array of VisitaMedico model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(VisitaMedico, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(VisitaMedico) filter?: Filter<VisitaMedico>,
  ): Promise<VisitaMedico[]> {
    return this.visitaMedicoRepository.find(filter);
  }

  @patch('/visita-medicos')
  @response(200, {
    description: 'VisitaMedico PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitaMedico, {partial: true}),
        },
      },
    })
    visitaMedico: VisitaMedico,
    @param.where(VisitaMedico) where?: Where<VisitaMedico>,
  ): Promise<Count> {
    return this.visitaMedicoRepository.updateAll(visitaMedico, where);
  }

  @get('/visita-medicos/{id}')
  @response(200, {
    description: 'VisitaMedico model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(VisitaMedico, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(VisitaMedico, {exclude: 'where'}) filter?: FilterExcludingWhere<VisitaMedico>
  ): Promise<VisitaMedico> {
    return this.visitaMedicoRepository.findById(id, filter);
  }

  @patch('/visita-medicos/{id}')
  @response(204, {
    description: 'VisitaMedico PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitaMedico, {partial: true}),
        },
      },
    })
    visitaMedico: VisitaMedico,
  ): Promise<void> {
    await this.visitaMedicoRepository.updateById(id, visitaMedico);
  }

  @put('/visita-medicos/{id}')
  @response(204, {
    description: 'VisitaMedico PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() visitaMedico: VisitaMedico,
  ): Promise<void> {
    await this.visitaMedicoRepository.replaceById(id, visitaMedico);
  }

  @del('/visita-medicos/{id}')
  @response(204, {
    description: 'VisitaMedico DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.visitaMedicoRepository.deleteById(id);
  }
}
