'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/task/:task_id/:user_id', 'TaskController.index');

Route.post('/task', 'TaskController.createTask');
Route.put('/task', 'TaskController.updateTask');
Route.delete('/task', 'TaskController.deleteTask');

Route.get('/tasklist/:list_id/:user_id', 'TaskListController.index');

Route.post('/tasklist', 'TaskListController.createTaskList');
Route.put('/tasklist', 'TaskListController.updateTaskList');
Route.delete('/tasklist', 'TaskListController.deleteTaskList');



