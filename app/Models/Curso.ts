import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Estudante from './Estudante';

export default class Curso extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string;

  @column()
  public descricao: string;

  @hasMany(() => Estudante, {
    foreignKey: 'cursoId',
  })
  public estudantes: HasMany<typeof Estudante>
}
