import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {ProgramarVisita} from '../models';
import {ProgramarVisitaRepository} from '../repositories';

export class ProgramavisitaController {
  constructor(
    @repository(ProgramarVisitaRepository)
    public programarVisitaRepository: ProgramarVisitaRepository,
  ) { }

  @post('/programar-visitas')
  @response(200, {
    description: 'ProgramarVisita model instance',
    content: {'application/json': {schema: getModelSchemaRef(ProgramarVisita)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProgramarVisita, {
            title: 'NewProgramarVisita',
            exclude: ['id'],
          }),
        },
      },
    })
    programarVisita: Omit<ProgramarVisita, 'id'>,
  ): Promise<ProgramarVisita> {
    return this.programarVisitaRepository.create(programarVisita);
  }

  @get('/programar-visitas/count')
  @response(200, {
    description: 'ProgramarVisita model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ProgramarVisita) where?: Where<ProgramarVisita>,
  ): Promise<Count> {
    return this.programarVisitaRepository.count(where);
  }

  @get('/programar-visitas')
  @response(200, {
    description: 'Array of ProgramarVisita model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProgramarVisita, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ProgramarVisita) filter?: Filter<ProgramarVisita>,
  ): Promise<ProgramarVisita[]> {
    return this.programarVisitaRepository.find(filter);
  }

  @patch('/programar-visitas')
  @response(200, {
    description: 'ProgramarVisita PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProgramarVisita, {partial: true}),
        },
      },
    })
    programarVisita: ProgramarVisita,
    @param.where(ProgramarVisita) where?: Where<ProgramarVisita>,
  ): Promise<Count> {
    return this.programarVisitaRepository.updateAll(programarVisita, where);
  }

  @get('/programar-visitas/{id}')
  @response(200, {
    description: 'ProgramarVisita model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ProgramarVisita, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ProgramarVisita, {exclude: 'where'}) filter?: FilterExcludingWhere<ProgramarVisita>
  ): Promise<ProgramarVisita> {
    return this.programarVisitaRepository.findById(id, filter);
  }

  @patch('/programar-visitas/{id}')
  @response(204, {
    description: 'ProgramarVisita PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProgramarVisita, {partial: true}),
        },
      },
    })
    programarVisita: ProgramarVisita,
  ): Promise<void> {
    await this.programarVisitaRepository.updateById(id, programarVisita);
  }

  @put('/programar-visitas/{id}')
  @response(204, {
    description: 'ProgramarVisita PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() programarVisita: ProgramarVisita,
  ): Promise<void> {
    await this.programarVisitaRepository.replaceById(id, programarVisita);
  }

  @del('/programar-visitas/{id}')
  @response(204, {
    description: 'ProgramarVisita DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.programarVisitaRepository.deleteById(id);
  }
}
