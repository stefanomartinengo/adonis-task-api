const { test, trait } = use('Test/Suite')('Task')
const Task = use('App/Models/Task')

trait('Test/ApiClient')


test('create a task', async ({ client }) => {
  const task_1 = {
    title: "testing title",
    category: "test category",
    list_id: 1,
    user_id: 1
  }
  const response = await client.post('/task')
    .send(task_1).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    value: {
          "title":"testing title",
          "category":"test category"
    }
  })
})

test('get a task', async ({ client }) => {
  const response = await client.get('/task/1/1').end()

  response.assertStatus(200)
  response.assertJSONSubset(
    {value: [{
      "task_title":"Finish bugs for sprint",
      "category":"professional",
      "list_id":1,
      "list_title":"Major release",
      "user":1
    }]
    }
)
})

