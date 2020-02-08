'use strict'

const TaskList = use('App/Models/TaskList')

class TaskListController {
  async index({ params, response }) {
    /**
     * @param  {required [ list_id(int), user_id(int) ]} request_url_params
     */
    const { list_id, user_id } = params

    let list = await TaskList.readTaskList(list_id, user_id)
    if(list.length > 0) {
      return response.json({
        status: 200,
        value: list
      })
    } else {
      return response.status(200).json({
        value: 'unable to fetch list'
      })
    }
  }

  async createTaskList({ request, response }) {
    /**
     * @param {required [ title(string), user_id(int) ]} request_body
     */
    const { title, user_id } = request.post()
    let addedTaskList = await TaskList.createTaskList(title, user_id)
    if(addedTaskList.length > 0) {
      return response.status(200).json({
        value: addedTaskList[0]
      })
    } else {
      return response.json({
        status: 400,
        value: 'unable to create list'
      })
    }
  }

  async updateTaskList( {request, response} ) {
    /**
     * @param {
     *  required [ task_id(int), user_id(int) ]
     *  optional [ title(string) ]} request_body
     */
    const { task_id, user_id, title } = request.post()
    let updatedTaskList = await TaskList.updateTaskList(task_id, user_id, title ? title : null)

    if(updatedTaskList.length > 0) {
    return response.json({
      status: 200,
      value: updatedTaskList
    })
    } else {
      return response.json({
        status: 400,
        value: 'unable to update list'
      })
    }
  }

  async deleteTaskList( {request, response} ) {
        /**
     * @param {required [ list_id(int), user_id(int) ]} request_body
     */
    const { list_id, user_id } = request.post()
    let deletedTaskList = await TaskList.deleteTaskList(list_id, user_id)

    if(deletedTaskList === 1) {
      return response.json({
        status: 200,
        value: 'list removed'
      })
    } else {
      return response.json({
        status: 400,
        value: 'unable to delete list'
      })
    }
  }
}

module.exports = TaskListController
