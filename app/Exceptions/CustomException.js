'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class UnfulfilledRequest extends LogicalException {

  handle(error, { response }) {
    return response.status(404).json({
      error: "Unacceptable or insufficient post data passed in"
    });
  }
}

module.exports = UnfulfilledRequest
