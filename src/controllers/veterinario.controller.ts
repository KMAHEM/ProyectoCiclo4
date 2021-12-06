import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
import {
  Count,
  CountSchema, Filter, FilterExcludingWhere, repository, Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Llaves} from '../config/llaves';
import {Credenciales, Veterinario} from '../models';
import {VeterinarioRepository} from '../repositories';
import {AutenticacionService} from '../services';
const fetch = require('node-fetch');
// @authenticate("admin")
export class VeterinarioController {
  constructor(
    @repository(VeterinarioRepository)
    public veterinarioRepository: VeterinarioRepository,
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
  ) { }

  @post('/identificarVeterinario', {
    responses: {
      '200': {
        description: "Identificacion de usuarios"
      }
    }
  })
  async validarVeterinario(
    @requestBody() credenciales: Credenciales
  ) {

    let vet = await this.servicioAutenticacion.IdentificarVeterinario(credenciales.usuario, credenciales.clave);
    if (vet) {
      let token = this.servicioAutenticacion.GenerarTokenVeterianrio(vet);
      return {
        datos: {
          nombre: vet.Nombres,
          correo: vet.Correo,
          id: vet.id
        },
        tk: token
      }
    } else {
      throw new HttpErrors[401]("Datos invalidos");
    }
  }

  @post('/veterinarios')
  @response(200, {
    description: 'Veterinario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Veterinario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veterinario, {
            title: 'NewVeterinario',
            exclude: ['id'],
          }),
        },
      },
    })
    veterinario: Omit<Veterinario, 'id'>,
  ): Promise<Veterinario> {
    let clave = this.servicioAutenticacion.GenerarClave();
    let claveCifrada = this.servicioAutenticacion.CifrarClave(clave);
    veterinario.clave = claveCifrada;
    let objVeterinario = await this.veterinarioRepository.create(veterinario);

    let destino = veterinario.Correo;
    let asunto = 'Registro en la App Atencion Mascotas';
    let contenido = `Hola ${veterinario.Nombres}, su nombre de usuario es: ${veterinario.Correo} y su contraseña es: ${clave}`;
    fetch(`${Llaves.urlServicioNotificaciones}/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then((data: any) => {
        console.log(data);
      });
    let sms = veterinario.Telefono;
    let mensaje = `hola ${veterinario.Nombres}, su nombre de usuario es: ${veterinario.Correo}, y su contraseña es: ${clave}`;
    fetch(`${Llaves.urlServicioNotificaciones}/envio-sms?mensaje=${mensaje}&telefono=${sms}`)
      .then((data: any) => {
        console.log(data);
      });
    return objVeterinario;

  }

  @get('/veterinarios/count')
  @response(200, {
    description: 'Veterinario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Veterinario) where?: Where<Veterinario>,
  ): Promise<Count> {
    return this.veterinarioRepository.count(where);
  }
  @authenticate.skip()
  @get('/veterinarios')
  @response(200, {
    description: 'Array of Veterinario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Veterinario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Veterinario) filter?: Filter<Veterinario>,
  ): Promise<Veterinario[]> {
    return this.veterinarioRepository.find(filter);
  }

  @patch('/veterinarios')
  @response(200, {
    description: 'Veterinario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veterinario, {partial: true}),
        },
      },
    })
    veterinario: Veterinario,
    @param.where(Veterinario) where?: Where<Veterinario>,
  ): Promise<Count> {
    return this.veterinarioRepository.updateAll(veterinario, where);
  }

  @get('/veterinarios/{id}')
  @response(200, {
    description: 'Veterinario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Veterinario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Veterinario, {exclude: 'where'}) filter?: FilterExcludingWhere<Veterinario>
  ): Promise<Veterinario> {
    return this.veterinarioRepository.findById(id, filter);
  }

  @patch('/veterinarios/{id}')
  @response(204, {
    description: 'Veterinario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veterinario, {partial: true}),
        },
      },
    })
    veterinario: Veterinario,
  ): Promise<void> {
    await this.veterinarioRepository.updateById(id, veterinario);
  }

  @put('/veterinarios/{id}')
  @response(204, {
    description: 'Veterinario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() veterinario: Veterinario,
  ): Promise<void> {
    await this.veterinarioRepository.replaceById(id, veterinario);
  }

  @del('/veterinarios/{id}')
  @response(204, {
    description: 'Veterinario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.veterinarioRepository.deleteById(id);
  }
}
