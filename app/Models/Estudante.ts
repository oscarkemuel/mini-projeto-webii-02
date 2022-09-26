import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Curso from './Curso';
import Disciplina from './Disciplina';

export default class Estudante extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string;

  @column({ columnName: 'curso_id' })
  public cursoId: number

  @belongsTo(() => Curso, {
    foreignKey: 'cursoId',
  })
  public curso: BelongsTo<typeof Curso>

  // has many disciplinas
  @manyToMany(() => Disciplina, {
    pivotTable: 'estudante_disciplinas',
    pivotForeignKey: 'estudante_id',
    pivotRelatedForeignKey: 'disciplina_id'
  })
  public disciplinas: ManyToMany<typeof Disciplina>
}
