import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Estudante from './Estudante'

export default class Avatar extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nomeFantasia: string

  @column({ columnName: 'estudante_id' })
  public estudanteId: number

  @belongsTo(() => Estudante, {
    foreignKey: 'estudanteId',
  })
  public estudante: BelongsTo<typeof Estudante>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
