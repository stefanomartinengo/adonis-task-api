'use strict'

const Task = use('App/Models/Task')
const CustomException = use('App/Exceptions/CustomException')

class TaskController {
  async index({params, response}) {
    /**
     * @param {required [ task_id(int), user_id(int) ]} request_url_params
     */
    const { task_id, user_id } = params
    let task = await Task.readTask(task_id, user_id)
    if(task.length > 0) {
      return response.status(200).json({
        value: task
      })
    } else {
      return response.status(400).json({
        value: 'unable to fetch task'
      })
    }
  }

  async createTask({ request, response }) {
    /**
     * @param {required [ title(string), category(string), list_id(int), user_id(int) ]} request_body
     */
    const { title, category, list_id, user_id } = request.post()
    let addedTask = await Task.createTask(title, category, list_id, user_id)
    if(addedTask.length > 0) {
      return response.status(200).json({
        value: addedTask[0]
      })
    } else {
      return response.status(400).json({
        value: 'unable to create task'
      })
    }
  }

  async updateTask( {request, response} ) { //
    /**
    * @param {
      *  required [ task_id(int), user_id(int) ]
      *  optional [ title(string), category(string) ]} request_body
    */
    const { task_id, title, category, list_id, user_id } = request.post()
    let updatedTask = await Task.updateTask(task_id, (title ? title : null), (category ? category : null), list_id, user_id)

    if(updatedTask.length > 0) {
      return response.json({
        status: 200,
        value: updatedTask
      })
    } else {
      return response.json({
        status: 400,
        value: 'unable to update task'
      })
    }
  }

  async deleteTask( {request, response} ) {
    /**
    * @param {required [ task_id(int), list_id(int), user_id(int) ]} request_body
    */
    const { task_id, list_id, user_id } = request.post()
    let deletedTask = await Task.deleteTask(task_id, list_id, user_id)
    if(deletedTask === 1) {
      return response.json({
        status: 200,
        value: 'removed task'
      })
    } else {
      return response.json({
        status: 400,
        value: 'unable to delete task'
      })
    }
  }
}

module.exports = TaskController
