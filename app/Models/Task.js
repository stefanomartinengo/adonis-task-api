'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const UnfulfilledRequest = use('App/Exceptions/CustomException')

const Model = use('Model')
const Database = use('Database')
const query = Database.table('tasks')

const verifyListOwner = async (list_id, user_id) => {
    return await Database.select('*').from('task_lists').where({id:list_id, user:user_id })
}

class Task extends Model {
  static boot () {
    super.boot()

    this.readTask = async (task_id, user_id) => {
      return await Database
        .select('t.id as task_id', 't.title as task_title', 't.category', 't.task_list_id as list_id', 'tl.title as list_title', 'tl.user as user')
        .from('tasks as t')
        .innerJoin('task_lists as tl', 't.task_list_id', 'tl.id')
        .where({'t.id': task_id, 'tl.user': user_id })
    }

    this.createTask = async (title, category, list_id, user_id) => {
      let checkList = await verifyListOwner(list_id, user_id)
      if(checkList.length > 0) {
        return await query
          .insert(
            {
              category,
              created_at: Database.fn.now(),
              task_list_id: list_id,
              title
            }
          ).returning(['title', 'category'])
      }
    }

    this.updateTask = async (task_id, title, category, list_id, user_id) => {
      let checkList = await verifyListOwner(list_id, user_id)
      if(checkList.length > 0) {
        let updateTaskParameters = { id: task_id, title, category, updated_at: Database.fn.now() }
        updateTaskParameters = Object.entries(updateTaskParameters).reduce((a,[k,v]) => (v == null ? a : {...a, [k]:v}), {})

        return await query
          .where({ 'id': task_id })
          .update(updateTaskParameters)
      }
    }

    this.deleteTask = async (task_id, list_id, user_id) => {
      let checkList = await verifyListOwner(list_id, user_id)
      if(checkList.length > 0) {
        return await query
          .where('id', task_id)
          .delete()
      }
    }
  }
}

module.exports = Task
