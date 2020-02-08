const { test, trait } = use('Test/Suite')('TaskList')
const TaskList = use('App/Models/TaskList')

trait('Test/ApiClient')

test('get a list', async ({ client }) => {
  const response = await client.get('/tasklist/1/1').end()
  response.assertStatus(200)
  response.assertJSONSubset({ value:  [{"id":1,"user":1,"title":"Major release"}]  })
})

test('create a list', async ({ client }) => { // creates 4th list
  const list_1 = {
    title: "testing list title",
    user_id: 1
  }
  const response = await client.post('/tasklist')
    .send(list_1).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    value: {
          "id": 4,
          "title":"testing list title",
    }
  })
})



