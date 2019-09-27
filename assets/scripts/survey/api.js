'use strict'

const config = require('./../config')
const store = require('./../store')

const indexSurvey = () => {
  return $.ajax({
    url: config.apiUrl + '/surveys',
    headers: {
      Authorization: 'bearer ' + store.user.token
    }
  })
}

const showSurvey = id => {
  return $.ajax({
    url: config.apiUrl + '/surveys/' + id,
    headers: {
      Authorization: 'bearer ' + store.user.token
    }
  })
}

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

const answerSurvey = (surveyId, response) => {
  return $.ajax({
    url: config.apiUrl + '/response/' + surveyId,
    method: 'PATCH',
    headers: {
      Authorization: 'bearer ' + store.user.token
    },
    data: response
  })
}

module.exports = {
  indexSurvey,
  showSurvey,
  createSurvey,
  answerSurvey
}
