'use strict'

const config = require('./../config')
const store = require('./../store')

const createSurvey = data => {
  return $.ajax({
    url: config.apiUrl + '/surveys',
    method: 'POST',
    headers: {
      Authorization: 'bearer ' + store.user.token
    },
    data
  })
}

module.exports = {
  createSurvey
}
