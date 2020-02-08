'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const UnfulfilledRequest = use('App/Exceptions/CustomException')

const Model = use('Model')
const Database = use('Database')
const query = Database.table('task_lists')

class TaskList extends Model {
  static boot () {
    super.boot()

    this.readTaskList = async ( list_id, user_id ) => { // get list by id
      return await query
        .where({ id: list_id, user: user_id })
        .returning(['title'])
    }

    this.createTaskList = async ( title, user_id ) => { // add new list
      if((title === undefined)||(user_id === undefined)) {
        throw new UnfulfilledRequest()
      }
      return await query
        .insert({ title, user: user_id, created_at: Database.fn.now() })
        .returning(['id', 'title'])
    }

    this.updateTaskList = async ( task_id, user_id, title ) => { // change task title
      if((task_id === undefined)||(user_id === undefined)) {
        throw new UnfulfilledRequest()
      }

      let updateListParameters = { id:task_id, user:user_id, title, updated_at: Database.fn.now() }
      updateListParameters = Object.entries(updateListParameters).reduce((a,[k,v]) => (v == null ? a : {...a, [k]:v}), {})
      // Clear null/undefined values for dynamic update object ^

      return await query
        .where({ 'id': task_id, user: user_id  })
        .update(updateListParameters)
    }

    this.deleteTaskList = async (list_id, user_id) => {
      if((list_id === undefined)||(user_id === undefined)) {
        throw new UnfulfilledRequest()
      }

      return await query
        .where({id: list_id, user: user_id})
        .delete()
    }

    this.tasks = () => {
      return this.hasMany('App/Models/Task', 'id', 'task_list_id')
    }
  }
}

module.exports = TaskList
