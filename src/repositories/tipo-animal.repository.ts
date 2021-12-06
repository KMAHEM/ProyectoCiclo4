import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {TipoAnimal, TipoAnimalRelations, Veterinario, Mascotas, ProgramarVisita} from '../models';
import {VeterinarioRepository} from './veterinario.repository';
import {MascotasRepository} from './mascotas.repository';
import {ProgramarVisitaRepository} from './programar-visita.repository';

export class TipoAnimalRepository extends DefaultCrudRepository<
  TipoAnimal,
  typeof TipoAnimal.prototype.id,
  TipoAnimalRelations
> {

  public readonly veterinario: BelongsToAccessor<Veterinario, typeof TipoAnimal.prototype.id>;

  public readonly mascotas: HasOneRepositoryFactory<Mascotas, typeof TipoAnimal.prototype.id>;

  public readonly programarVisita: HasOneRepositoryFactory<ProgramarVisita, typeof TipoAnimal.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VeterinarioRepository') protected veterinarioRepositoryGetter: Getter<VeterinarioRepository>, @repository.getter('MascotasRepository') protected mascotasRepositoryGetter: Getter<MascotasRepository>, @repository.getter('ProgramarVisitaRepository') protected programarVisitaRepositoryGetter: Getter<ProgramarVisitaRepository>,
  ) {
    super(TipoAnimal, dataSource);
    this.programarVisita = this.createHasOneRepositoryFactoryFor('programarVisita', programarVisitaRepositoryGetter);
    this.registerInclusionResolver('programarVisita', this.programarVisita.inclusionResolver);
    this.mascotas = this.createHasOneRepositoryFactoryFor('mascotas', mascotasRepositoryGetter);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
    this.veterinario = this.createBelongsToAccessorFor('veterinario', veterinarioRepositoryGetter,);
    this.registerInclusionResolver('veterinario', this.veterinario.inclusionResolver);
  }
}
