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
  Mascotas,
} from '../models';
import {TipoAnimalRepository} from '../repositories';

export class TipoAnimalMascotasController {
  constructor(
    @repository(TipoAnimalRepository) protected tipoAnimalRepository: TipoAnimalRepository,
  ) { }

  @get('/tipo-animals/{id}/mascotas', {
    responses: {
      '200': {
        description: 'TipoAnimal has one Mascotas',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Mascotas),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Mascotas>,
  ): Promise<Mascotas> {
    return this.tipoAnimalRepository.mascotas(id).get(filter);
  }

  @post('/tipo-animals/{id}/mascotas', {
    responses: {
      '200': {
        description: 'TipoAnimal model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mascotas)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof TipoAnimal.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascotas, {
            title: 'NewMascotasInTipoAnimal',
            exclude: ['id'],
            optional: ['tipoAnimalId']
          }),
        },
      },
    }) mascotas: Omit<Mascotas, 'id'>,
  ): Promise<Mascotas> {
    return this.tipoAnimalRepository.mascotas(id).create(mascotas);
  }

  @patch('/tipo-animals/{id}/mascotas', {
    responses: {
      '200': {
        description: 'TipoAnimal.Mascotas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascotas, {partial: true}),
        },
      },
    })
    mascotas: Partial<Mascotas>,
    @param.query.object('where', getWhereSchemaFor(Mascotas)) where?: Where<Mascotas>,
  ): Promise<Count> {
    return this.tipoAnimalRepository.mascotas(id).patch(mascotas, where);
  }

  @del('/tipo-animals/{id}/mascotas', {
    responses: {
      '200': {
        description: 'TipoAnimal.Mascotas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Mascotas)) where?: Where<Mascotas>,
  ): Promise<Count> {
    return this.tipoAnimalRepository.mascotas(id).delete(where);
  }
}
