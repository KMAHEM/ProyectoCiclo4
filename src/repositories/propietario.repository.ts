import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Propietario, PropietarioRelations, Mascotas, ProgramarVisita} from '../models';
import {MascotasRepository} from './mascotas.repository';
import {ProgramarVisitaRepository} from './programar-visita.repository';

export class PropietarioRepository extends DefaultCrudRepository<
  Propietario,
  typeof Propietario.prototype.id,
  PropietarioRelations
> {

  public readonly mascotas: HasManyRepositoryFactory<Mascotas, typeof Propietario.prototype.id>;

  public readonly programarVisita: HasOneRepositoryFactory<ProgramarVisita, typeof Propietario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotasRepository') protected mascotasRepositoryGetter: Getter<MascotasRepository>, @repository.getter('ProgramarVisitaRepository') protected programarVisitaRepositoryGetter: Getter<ProgramarVisitaRepository>,
  ) {
    super(Propietario, dataSource);
    this.programarVisita = this.createHasOneRepositoryFactoryFor('programarVisita', programarVisitaRepositoryGetter);
    this.registerInclusionResolver('programarVisita', this.programarVisita.inclusionResolver);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotasRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
  }
}
