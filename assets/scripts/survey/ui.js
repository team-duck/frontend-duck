'use strict'

const store = require('./../store')
const handleResponse = require('./../common/handleResponse')
const navbarTemplate = require('./../templates/nav-bar-content.handlebars')
const mainPageTemplate = require('./../templates/main-page/main-body.handlebars')
const createSurveyTemplate = require('./../templates/create-survey/create-survey-modal.handlebars')
const updateSurveyTemplate = require('./../templates/create-survey/update-survey-modal.handlebars')
const respondSurveyTemplate = require('./../templates/surveys-page/respond-survey-modal.handlebars')
const showSurveysTemplate = require('./../templates/surveys-page/surveys-page.handlebars')
const showMySurveysTemplate = require('./../templates/surveys-page/my-surveys-page.handlebars')
const showResultsTemplate = require('./../templates/surveys-page/results-page.handlebars')

const chartData = require('./../../../lib/chart')
const CanvasJS = require('canvasjs/dist/jquery.canvasjs.min.js')

const loadNavbar = () => {
  const navbarHtml = navbarTemplate()
  $('header').html(navbarHtml)
}
const loadMainPage = (surveys) => {
  const mainPageHtml = mainPageTemplate({surveys: surveys})
  $('main').html(mainPageHtml)
}

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

// retrieves surveys
const indexSurveySuccess = (data, type) => {
  const action = ['indexSurveys', 'danger', 'success']
  handleResponse(data, action, () => {
    store.surveys = data.surveys
    let showSurveysHtml
    if (type === 'all') {
      showSurveysHtml = showSurveysTemplate({ surveys: data.surveys })
      $('#view').html(showSurveysHtml)
    } else if (type === 'my') {
      showSurveysHtml = showMySurveysTemplate({ surveys: data.surveys })
      $('#view').html(showSurveysHtml)
    } else if (type === 'signIn') {
      loadNavbar()
      loadMainPage(store.surveys)
    }
  })
}

const createSurveySuccess = data => {
  const action = ['createSurvey', 'danger', 'success']
  handleResponse(data, action, () => {
    $('form').trigger('reset')
    $('#create-survey-modal').modal('toggle')
  })
}

const showSurveySuccess = data => {
  const action = ['showSurvey', 'danger', 'success']
  handleResponse(data, action)
}

const updateSurveySuccess = data => {
  const action = ['updateSurvey', 'danger', 'success']
  handleResponse(data, action, () => {
    $('form').trigger('reset')
    $('#update-survey-modal').modal('toggle')
  })
}

const deleteSurveySuccess = data => {
  const action = ['deleteSurvey', 'danger', 'success']
  handleResponse(data, action)
}

const answerSurveySuccess = data => {
  const action = ['answerSurvey', 'danger', 'success']
  handleResponse(data, action)
}

const showSurveyResults = data => {
  const options = chartData(data.survey)[0]
  const showResultsHtml = showResultsTemplate({survey: data.survey})
  $('#view').html(showResultsHtml)
  $('#chartContainer').CanvasJSChart(options)
}

module.exports = {
  loadCreateSurvey,
  loadUpdateSurvey,
  loadRespondSurvey,
  indexSurveySuccess,
  createSurveySuccess,
  showSurveySuccess,
  updateSurveySuccess,
  deleteSurveySuccess,
  answerSurveySuccess,
  showSurveyResults,
  store
}
