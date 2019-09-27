'use strict'

const store = require('./../store')
const createSurveyTemplate = require('./../templates/create-survey/create-survey-form.handlebars')
const showSurveysTemplate = require('./../templates/surveys-page/surveys-page.handlebars')
// const chartData = require('./../../../lib/chart')
const CanvasJS = require('canvasjs/dist/jquery.canvasjs.min.js')

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
  console.log('Options from ui.js ', options)
  $('#chartContainer').CanvasJSChart(options)
}

const showSurveyFailure = () => {
  $('#survey-status').text('Survey not retrieved!')
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
  showSurveySuccess,
  showSurveyFailure,
  createSurveySuccess,
  createSurveyFailure,
  showSurveyResults,
  respondToSurvey,
  viewSurveySuccess,
  store
}
