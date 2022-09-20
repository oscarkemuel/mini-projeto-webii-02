import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Estudante extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public primeiroNome: string;

  @column()
  public ultimoNome: string;

  @column()
  public curso: string;

  @column()
  public linguagem: string;

  @column()
  public sistemasOperacionas: string;
}
