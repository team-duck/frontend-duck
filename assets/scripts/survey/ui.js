'use strict'

const store = require('./../store')
const createSurveyTemplate = require('./../templates/create-survey/create-survey-modal.handlebars')
const updateSurveyTemplate = require('./../templates/create-survey/update-survey-modal.handlebars')
const respondSurveyTemplate = require('./../templates/surveys-page/respond-survey-modal.handlebars')
const showSurveysTemplate = require('./../templates/surveys-page/surveys-page.handlebars')
const chartData = require('./../../../lib/chart')
const CanvasJS = require('canvasjs/dist/jquery.canvasjs.min.js')

// loads the modal for creating survey
const loadCreateSurvey = () => {
  const createSurveyHtml = createSurveyTemplate()
  $('.modal-container').html(createSurveyHtml)
  $('#create-survey-modal').modal('toggle')
}

// loads the modal for updating survey
const loadUpdateSurvey = data => {
  const updateSurveyHtml = updateSurveyTemplate({survey: data.survey})
  $('.modal-container').html(updateSurveyHtml)
  $('#update-survey-modal').modal('toggle')
}

// loads the modal for answering survey
const loadRespondSurvey = data => {
  const respondSurveyHtml = respondSurveyTemplate(data)
  $('.modal-container').html(respondSurveyHtml)
  $('#respond-survey-modal').modal('toggle')
}

// retrieves all surveys
const indexSurveySuccess = data => {
  const showSurveysHtml = showSurveysTemplate({ surveys: data.surveys })
  $('#view').html(showSurveysHtml)
}

const indexSurveyFailure = () => {
  $('#survey-status').text('Surveys not retrieved!')
}

const respondToSurvey = data => {
  console.log('respondToSurvey', data) // here
}

const showSurveyResults = data => {
  const options = chartData(data.survey)[0]

  $('#chartContainer').CanvasJSChart(options)
}

const showSurveyFailure = () => {
  $('#survey-status').text('Survey not retrieved!')
}

const updateSurveyFailure = () => {
  // $('#create-survey-modal').text('Survey not updated!')
  console.log('survey not updated')
}

const createSurveySuccess = () => {
  $('form').trigger('reset')
  $('#create-survey-modal').modal('toggle')
}

const createSurveyFailure = () => {
  $('#survey-status').text('Survey not created!')
}

module.exports = {
  loadCreateSurvey,
  loadUpdateSurvey,
  loadRespondSurvey,
  indexSurveySuccess,
  indexSurveyFailure,
  showSurveyFailure,
  createSurveySuccess,
  createSurveyFailure,
  showSurveyResults,
  updateSurveyFailure,
  respondToSurvey,
  store
}
