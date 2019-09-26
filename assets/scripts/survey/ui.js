'use strict'

const store = require('./../store')

const indexSurveySuccess = data => {
  console.log(data)
  for (let i = 0; i < data.surveys.length; i++) {
    $('#survey-status').append(`<p>${JSON.stringify(data.surveys[i])}</p>`)
  }
}

const indexSurveyFailure = () => {
  $('#survey-status').text('Surveys not retrieved!')
}

const createSurveySuccess = () => {
  $('#survey-status').text('Survey created!')
}

const createSurveyFailure = () => {
  $('#survey-status').text('Survey not created!')
}

module.exports = {
  indexSurveySuccess,
  indexSurveyFailure,
  createSurveySuccess,
  createSurveyFailure
}
