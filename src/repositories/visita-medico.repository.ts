import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {VisitaMedico, VisitaMedicoRelations} from '../models';

export class VisitaMedicoRepository extends DefaultCrudRepository<
  VisitaMedico,
  typeof VisitaMedico.prototype.id,
  VisitaMedicoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(VisitaMedico, dataSource);
  }
}
