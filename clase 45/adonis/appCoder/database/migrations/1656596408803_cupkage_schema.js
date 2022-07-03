'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CupkageSchema extends Schema {
  up () {
    this.create('cupkages', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('cupkages')
  }
}

module.exports = CupkageSchema
