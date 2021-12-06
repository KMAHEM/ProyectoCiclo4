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
  Mascotas,
} from '../models';
import {PropietarioRepository} from '../repositories';

export class PropietarioMascotasController {
  constructor(
    @repository(PropietarioRepository) protected propietarioRepository: PropietarioRepository,
  ) { }

  @get('/propietarios/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Array of Propietario has many Mascotas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascotas)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Mascotas>,
  ): Promise<Mascotas[]> {
    return this.propietarioRepository.mascotas(id).find(filter);
  }

  @post('/propietarios/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Propietario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mascotas)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Propietario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascotas, {
            title: 'NewMascotasInPropietario',
            exclude: ['id'],
            optional: ['propietarioId']
          }),
        },
      },
    }) mascotas: Omit<Mascotas, 'id'>,
  ): Promise<Mascotas> {
    return this.propietarioRepository.mascotas(id).create(mascotas);
  }

  @patch('/propietarios/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Propietario.Mascotas PATCH success count',
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
    return this.propietarioRepository.mascotas(id).patch(mascotas, where);
  }

  @del('/propietarios/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Propietario.Mascotas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Mascotas)) where?: Where<Mascotas>,
  ): Promise<Count> {
    return this.propietarioRepository.mascotas(id).delete(where);
  }
}
