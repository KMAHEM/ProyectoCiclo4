import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Veterinario, VeterinarioRelations, CentroVeterinario, ProgramarVisita, VisitaMedico} from '../models';
import {CentroVeterinarioRepository} from './centro-veterinario.repository';
import {ProgramarVisitaRepository} from './programar-visita.repository';
import {VisitaMedicoRepository} from './visita-medico.repository';

export class VeterinarioRepository extends DefaultCrudRepository<
  Veterinario,
  typeof Veterinario.prototype.id,
  VeterinarioRelations
> {

  public readonly centroVeterinario: BelongsToAccessor<CentroVeterinario, typeof Veterinario.prototype.id>;

  public readonly programarVisita: HasOneRepositoryFactory<ProgramarVisita, typeof Veterinario.prototype.id>;

  public readonly visitaMedico: HasOneRepositoryFactory<VisitaMedico, typeof Veterinario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CentroVeterinarioRepository') protected centroVeterinarioRepositoryGetter: Getter<CentroVeterinarioRepository>, @repository.getter('ProgramarVisitaRepository') protected programarVisitaRepositoryGetter: Getter<ProgramarVisitaRepository>, @repository.getter('VisitaMedicoRepository') protected visitaMedicoRepositoryGetter: Getter<VisitaMedicoRepository>,
  ) {
    super(Veterinario, dataSource);
    this.visitaMedico = this.createHasOneRepositoryFactoryFor('visitaMedico', visitaMedicoRepositoryGetter);
    this.registerInclusionResolver('visitaMedico', this.visitaMedico.inclusionResolver);
    this.programarVisita = this.createHasOneRepositoryFactoryFor('programarVisita', programarVisitaRepositoryGetter);
    this.registerInclusionResolver('programarVisita', this.programarVisita.inclusionResolver);
    this.centroVeterinario = this.createBelongsToAccessorFor('centroVeterinario', centroVeterinarioRepositoryGetter,);
    this.registerInclusionResolver('centroVeterinario', this.centroVeterinario.inclusionResolver);
  }
}
