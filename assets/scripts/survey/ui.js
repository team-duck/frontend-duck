'use strict'

const store = require('./../store')
const createSurveyTemplate = require('./../templates/create-survey/create-survey-form.handlebars')
const showSurveysTemplate = require('./../templates/surveys-page/surveys-page.handlebars')
const updateSurveyTemplate = require('./../templates/create-survey/update-survey-form.handlebars')
const respondSurveyTemplate = require('./../templates/surveys-page/survey-card.handlebars')
const chartData = require('./../../../lib/chart')
const CanvasJS = require('canvasjs/dist/jquery.canvasjs.min.js')

// loads the modal for creating surveys
const loadCreateSurvey = () => {
  const createSurveyHtml = createSurveyTemplate()
  $('.custom-modal-forms').html(createSurveyHtml)
}

// retrieves all surveys
const indexSurveySuccess = data => {
  const showSurveysHtml = showSurveysTemplate({ surveys: data.surveys })
  $('#view').html(showSurveysHtml)
}

const indexSurveyFailure = () => {
  $('#survey-status').text('Surveys not retrieved!')
}

// opens modal for answering survey
const loadRespondSurvey = data => {
  const respondSurveyHtml = respondSurveyTemplate(data)
  $('.modal-container').html(respondSurveyHtml)
  $('#respond-survey-modal').modal('toggle')
}

const respondToSurvey = data => {
  console.log('respondToSurvey', data) // here
}

const showSurveyResults = data => {
  const options = chartData(data.survey)[0]

  $('#chartContainer').CanvasJSChart(options)
}

const viewSurveySuccess = data => {
  // $('#survey-status').append(`<p>${JSON.stringify(data)}</p>`)
  // const options = chartData(data.survey)[0]
  const options = {
    animationEnabled: true,
    title: {
      text: 'test'
    },
    axisY: {
      title: 'User responses',
      suffix: '',
      includeZero: true
    },
    axisX: {
      title: 'Responses'
    },
    data: []
  }
}

const showSurveyFailure = () => {
  $('#survey-status').text('Survey not retrieved!')
}

const updateSurveyModal = data => {

  const updateSurveyHtml = updateSurveyTemplate({survey: data.survey})
  $('.custom-modal-forms').html(updateSurveyHtml)
  $('#create-survey-modal').modal('toggle')
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
  indexSurveySuccess,
  indexSurveyFailure,
  loadRespondSurvey,
  showSurveyFailure,
  createSurveySuccess,
  createSurveyFailure,
  showSurveyResults,
  updateSurveyModal,
  respondToSurvey,
  viewSurveySuccess,
  store
}
