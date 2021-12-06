import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ProgramarVisita, ProgramarVisitaRelations} from '../models';

export class ProgramarVisitaRepository extends DefaultCrudRepository<
  ProgramarVisita,
  typeof ProgramarVisita.prototype.id,
  ProgramarVisitaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(ProgramarVisita, dataSource);
  }
}
