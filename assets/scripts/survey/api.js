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
    method: 'GET',
    headers: {
      Authorization: 'bearer ' + store.user.token
    }
  })
}
const deleteSurvey = id => {
  return $.ajax({
    url: config.apiUrl + '/surveys/' + id,
    method: 'DELETE',
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

const updateSurvey = data => {
  return $.ajax({
    url: config.apiUrl + '/surveys',
    method: 'PATCH',
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
  answerSurvey,
  updateSurvey,
  deleteSurvey
}
