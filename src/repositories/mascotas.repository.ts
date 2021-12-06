import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mascotas, MascotasRelations, ProgramarVisita, VisitaMedico} from '../models';
import {ProgramarVisitaRepository} from './programar-visita.repository';
import {VisitaMedicoRepository} from './visita-medico.repository';

export class MascotasRepository extends DefaultCrudRepository<
  Mascotas,
  typeof Mascotas.prototype.id,
  MascotasRelations
> {

  public readonly programarVisita: HasOneRepositoryFactory<ProgramarVisita, typeof Mascotas.prototype.id>;

  public readonly visitaMedico: HasOneRepositoryFactory<VisitaMedico, typeof Mascotas.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProgramarVisitaRepository') protected programarVisitaRepositoryGetter: Getter<ProgramarVisitaRepository>, @repository.getter('VisitaMedicoRepository') protected visitaMedicoRepositoryGetter: Getter<VisitaMedicoRepository>,
  ) {
    super(Mascotas, dataSource);
    this.visitaMedico = this.createHasOneRepositoryFactoryFor('visitaMedico', visitaMedicoRepositoryGetter);
    this.registerInclusionResolver('visitaMedico', this.visitaMedico.inclusionResolver);
    this.programarVisita = this.createHasOneRepositoryFactoryFor('programarVisita', programarVisitaRepositoryGetter);
    this.registerInclusionResolver('programarVisita', this.programarVisita.inclusionResolver);
  }
}
