'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
// const Factory = use('Factory')
const Database = use('Database')

class DatabaseSeeder {
  async run () {
    await Database.table('users').insert([
      {username: 'stefano', email: 'stefano@mail.com', password: 'pass1', created_at: Database.fn.now()},
      {username: 'peter', email: 'peter@mail.com', password: 'pass12', created_at: Database.fn.now()},
      {username: 'griffin', email: 'griffin@mail.com', password: 'pass123', created_at: Database.fn.now()},
    ])
    await Database.table('task_lists').insert([
      {user: 1, title: 'Major release', created_at: Database.fn.now()},
      {user: 1, title: 'Minor release', created_at: Database.fn.now() },
      {user: 2, title: 'Learn Perpetuum Mobile', created_at: Database.fn.now() }
    ])
    await Database.table('tasks').insert([
      {task_list_id: 1, title: 'Finish bugs for sprint', category: 'professional', created_at: Database.fn.now() },
      {task_list_id: 1, title: 'Deploy finished Bug Sprint', category: 'professional', created_at: Database.fn.now() },
      {task_list_id: 1, title: 'Deploy finished sprint', category: 'professional', created_at: Database.fn.now() },
      {task_list_id: 3, title: 'Clean windows', category: 'professional', created_at: Database.fn.now() },
      {task_list_id: 3, title: 'Learn Adonis', category: 'professional', created_at: Database.fn.now() },
      {task_list_id: 3, title: 'Practice Perpetuum mobile', category: 'professional', created_at: Database.fn.now() },
      {task_list_id: 2, title: 'Practice Perpetuum mobile', category: 'professional', created_at: Database.fn.now() }
    ])
  }
}

module.exports = DatabaseSeeder
