'use strict'
// const store = require('./../store')
const showAlert = require('./alerts')
const messages = require('./messages')
const statusCode = /[4-5][0-9][0-9]/

const handleResponse = (response, action, callback) => {
  if (response && statusCode.test(response.status)) {
    showAlert(messages[action[0]][0], action[1])
    return false
  } else {
    showAlert(messages[action[0]][1], action[2])
    if (callback) {
      callback()
    }
    return true
  }
}

module.exports = handleResponse
