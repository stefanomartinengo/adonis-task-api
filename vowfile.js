'use strict'

// Test cases currently only working on a fresh migration and db seeding

const ace = require('@adonisjs/ace')

module.exports = (cli, runner) => {
  runner.before(async () => {
    use('Adonis/Src/Server').listen(process.env.HOST, process.env.PORT)
  })

  runner.after(async () => {
    use('Adonis/Src/Server').getInstance().close()

    // reset db migrations and data
    await ace.call('migration:reset', {}, { silent: true })
    await ace.call('migration:run', {}, { silent: true })
    await ace.call('seed', {}, { silent: true })
  })
}
