'use strict'

const store = require('./../store')

const createSurveySuccess = () => {
  $('#survey-status').text('Survey created!')
}

const createSurveyFailure = () => {
  $('#survey-status').text('Survey not created!')
}

module.exports = {
  createSurveySuccess,
  createSurveyFailure
}
