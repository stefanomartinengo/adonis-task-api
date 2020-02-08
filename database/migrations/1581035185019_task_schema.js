'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskSchema extends Schema {
  up () {
    this.create('tasks', (table) => {
      table.increments('id')
      table.string('title')
      table.integer('task_list_id')
      table.string('category')
      table.timestamps('updated_at')
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = TaskSchema
