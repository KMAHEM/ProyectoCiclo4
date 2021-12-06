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
  TipoAnimal,
  ProgramarVisita,
} from '../models';
import {TipoAnimalRepository} from '../repositories';

export class TipoAnimalProgramarVisitaController {
  constructor(
    @repository(TipoAnimalRepository) protected tipoAnimalRepository: TipoAnimalRepository,
  ) { }

  @get('/tipo-animals/{id}/programar-visita', {
    responses: {
      '200': {
        description: 'TipoAnimal has one ProgramarVisita',
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
    return this.tipoAnimalRepository.programarVisita(id).get(filter);
  }

  @post('/tipo-animals/{id}/programar-visita', {
    responses: {
      '200': {
        description: 'TipoAnimal model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProgramarVisita)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof TipoAnimal.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProgramarVisita, {
            title: 'NewProgramarVisitaInTipoAnimal',
            exclude: ['id'],
            optional: ['tipoAnimalId']
          }),
        },
      },
    }) programarVisita: Omit<ProgramarVisita, 'id'>,
  ): Promise<ProgramarVisita> {
    return this.tipoAnimalRepository.programarVisita(id).create(programarVisita);
  }

  @patch('/tipo-animals/{id}/programar-visita', {
    responses: {
      '200': {
        description: 'TipoAnimal.ProgramarVisita PATCH success count',
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
    return this.tipoAnimalRepository.programarVisita(id).patch(programarVisita, where);
  }

  @del('/tipo-animals/{id}/programar-visita', {
    responses: {
      '200': {
        description: 'TipoAnimal.ProgramarVisita DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ProgramarVisita)) where?: Where<ProgramarVisita>,
  ): Promise<Count> {
    return this.tipoAnimalRepository.programarVisita(id).delete(where);
  }
}
