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
import {CentroVeterinario} from '../models';
import {CentroVeterinarioRepository} from '../repositories';

export class CentroVetController {
  constructor(
    @repository(CentroVeterinarioRepository)
    public centroVeterinarioRepository : CentroVeterinarioRepository,
  ) {}

  @post('/centro-veterinarios')
  @response(200, {
    description: 'CentroVeterinario model instance',
    content: {'application/json': {schema: getModelSchemaRef(CentroVeterinario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CentroVeterinario, {
            title: 'NewCentroVeterinario',
            exclude: ['id'],
          }),
        },
      },
    })
    centroVeterinario: Omit<CentroVeterinario, 'id'>,
  ): Promise<CentroVeterinario> {
    return this.centroVeterinarioRepository.create(centroVeterinario);
  }

  @get('/centro-veterinarios/count')
  @response(200, {
    description: 'CentroVeterinario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CentroVeterinario) where?: Where<CentroVeterinario>,
  ): Promise<Count> {
    return this.centroVeterinarioRepository.count(where);
  }

  @get('/centro-veterinarios')
  @response(200, {
    description: 'Array of CentroVeterinario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CentroVeterinario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CentroVeterinario) filter?: Filter<CentroVeterinario>,
  ): Promise<CentroVeterinario[]> {
    return this.centroVeterinarioRepository.find(filter);
  }

  @patch('/centro-veterinarios')
  @response(200, {
    description: 'CentroVeterinario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CentroVeterinario, {partial: true}),
        },
      },
    })
    centroVeterinario: CentroVeterinario,
    @param.where(CentroVeterinario) where?: Where<CentroVeterinario>,
  ): Promise<Count> {
    return this.centroVeterinarioRepository.updateAll(centroVeterinario, where);
  }

  @get('/centro-veterinarios/{id}')
  @response(200, {
    description: 'CentroVeterinario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CentroVeterinario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CentroVeterinario, {exclude: 'where'}) filter?: FilterExcludingWhere<CentroVeterinario>
  ): Promise<CentroVeterinario> {
    return this.centroVeterinarioRepository.findById(id, filter);
  }

  @patch('/centro-veterinarios/{id}')
  @response(204, {
    description: 'CentroVeterinario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CentroVeterinario, {partial: true}),
        },
      },
    })
    centroVeterinario: CentroVeterinario,
  ): Promise<void> {
    await this.centroVeterinarioRepository.updateById(id, centroVeterinario);
  }

  @put('/centro-veterinarios/{id}')
  @response(204, {
    description: 'CentroVeterinario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() centroVeterinario: CentroVeterinario,
  ): Promise<void> {
    await this.centroVeterinarioRepository.replaceById(id, centroVeterinario);
  }

  @del('/centro-veterinarios/{id}')
  @response(204, {
    description: 'CentroVeterinario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.centroVeterinarioRepository.deleteById(id);
  }
}
