import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CentroVeterinario, CentroVeterinarioRelations, Veterinario} from '../models';
import {VeterinarioRepository} from './veterinario.repository';

export class CentroVeterinarioRepository extends DefaultCrudRepository<
  CentroVeterinario,
  typeof CentroVeterinario.prototype.id,
  CentroVeterinarioRelations
> {

  public readonly veterinarios: HasManyRepositoryFactory<Veterinario, typeof CentroVeterinario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VeterinarioRepository') protected veterinarioRepositoryGetter: Getter<VeterinarioRepository>,
  ) {
    super(CentroVeterinario, dataSource);
    this.veterinarios = this.createHasManyRepositoryFactoryFor('veterinarios', veterinarioRepositoryGetter,);
    this.registerInclusionResolver('veterinarios', this.veterinarios.inclusionResolver);
  }
}
