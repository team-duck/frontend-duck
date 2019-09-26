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

const showSurveySuccess = data => {
  $('#survey-status').append(`<p>${JSON.stringify(data)}</p>`)
}

const showSurveyFailure = () => {
  $('#survey-status').text('Survey not retrieved!')
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
  showSurveySuccess,
  showSurveyFailure,
  createSurveySuccess,
  createSurveyFailure
}
