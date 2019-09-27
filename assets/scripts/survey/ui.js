'use strict'

const store = require('./../store')
const createSurveyTemplate = require('./../templates/create-survey-form.handlebars')
const surveyControlsTemplate = require('./../templates/survey-controls.handlebars')
const showSurveysTemplate = require('./../templates/survey-preview.handlebars')

const loadCreateSurvey = () => {
  const userControlsHtml = createSurveyTemplate()
  $('main').append(userControlsHtml)
}

const loadSurveyControls = () => {
  const surveyControlsHtml = surveyControlsTemplate()
  $('main').append(surveyControlsHtml)
}

const indexSurveySuccess = data => {
  const showSurveysHtml = showSurveysTemplate({ surveys: data.surveys })
  $('#survey-row').append(showSurveysHtml)
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
  loadCreateSurvey,
  loadSurveyControls,
  indexSurveySuccess,
  indexSurveyFailure,
  showSurveySuccess,
  showSurveyFailure,
  createSurveySuccess,
  createSurveyFailure,
  store
}
