'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskListSchema extends Schema {
  up () {
    this.create('task_lists', (table) => {
      table.increments()
      table.integer('user').notNullable()
      table.string('title').notNullable()
      table.timestamps('updated_at')
    })
  }

  down () {
    this.drop('task_lists')
  }
}

module.exports = TaskListSchema
