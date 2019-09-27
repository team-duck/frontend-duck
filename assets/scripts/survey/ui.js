'use strict'

const store = require('./../store')
const createSurveyTemplate = require('./../templates/create-survey-form.handlebars')
const showSurveysTemplate = require('./../templates/surveys-page/surveys-page.handlebars')

const loadCreateSurvey = () => {
  const createSurveyHtml = createSurveyTemplate()
  $('.modal-container').append(createSurveyHtml)
}

const indexSurveySuccess = data => {
  const showSurveysHtml = showSurveysTemplate({ surveys: data.surveys })
  $('#view').html(showSurveysHtml)
}

const indexSurveyFailure = () => {
  $('#survey-status').text('Surveys not retrieved!')
}

const showSurveySuccess = data => {
  $('#survey-status').append(`<p>${JSON.stringify(data)}</p>`)
}
const respondToSurvey = data => {
  console.log('respondToSurvey', data)
}
const showSurveyResults = data => {
  console.log('showSurveyResults', data)
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
  loadCreateSurvey,
  indexSurveySuccess,
  indexSurveyFailure,
  showSurveySuccess,
  showSurveyFailure,
  createSurveySuccess,
  createSurveyFailure,
  showSurveyResults,
  respondToSurvey,
  store
}
