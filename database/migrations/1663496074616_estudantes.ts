import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'estudantes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('primeiro_nome')
      table.string('ultimo_nome')
      table.string('curso')
      table.string('linguagem')
      table.string('sistemas_operacionas')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
