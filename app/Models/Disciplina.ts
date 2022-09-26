import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Estudante from './Estudante';

export default class Disciplina extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string;

  @column()
  public descricao: string;

  @manyToMany(() => Estudante, {
    pivotTable: 'estudante_disciplinas',
    pivotForeignKey: 'disciplina_id',
    pivotRelatedForeignKey: 'estudante_id'
  })
  public estudantes: ManyToMany<typeof Estudante>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
