'use strict'

const api = require('./api')
const getFormFields = require('./../../../lib/get-form-fields')
const ui = require('./ui')
const { apiUrl } = require('../config')
const socket = require('socket.io-client')(apiUrl)
const store = require('../store')
const processSurveyData = require('./../../../lib/process-survey-data')

const onIndexSurvey = (event, type) => {
  if (event) {
    event.preventDefault()
  }

  api.indexSurvey()
    .then(response => ui.indexSurveySuccess(response, type))
    .catch(ui.indexSurveySuccess)
}

const onSocketIndex = message => {
  console.log('socket words', message)
  const indexView = store.view === 'index' // expect store.view to be set by other functions, prevents

  api.indexSurvey()
    .then(data => {
      if (indexView) {
        ui.indexSurveySuccess(data)
      } else {
        store.surveys = data.surveys
      }
    })
    .catch(ui.indexSurveySuccess)
}

const onCreateSurveyButton = event => {
  event.preventDefault()

  ui.loadCreateSurvey()
}

const onCreateSurvey = event => {
  event.preventDefault()

  const data = getFormFields(event.target)
  const surveyPojo = processSurveyData(data)

  api.createSurvey(surveyPojo)
    .then(ui.createSurveySuccess)
    .catch(ui.createSurveySuccess)
}

// opens a modal for editing the survey
const onEditSurveyButton = event => {
  event.preventDefault()

  const id = $(event.target).data().id

  api.showSurvey(id)
    .then(ui.loadUpdateSurvey)
    .catch(ui.showSurveySuccess)
}

// retrieve edited survey data from form and process into an object
// send the object and survey ID to API to update the survey
const onUpdateSurvey = (event) => {
  event.preventDefault()

  const data = getFormFields(event.target)

  const id = data.survey.id
  delete data.survey.id
  const surveyPojo = processSurveyData(data)

  api.updateSurvey(id, surveyPojo)
    .then(ui.updateSurveySuccess)
    .catch(ui.updateSurveySuccess)
}

const onDeleteSurvey = event => {
  event.preventDefault()

  const id = $(event.target).data().id

  api.deleteSurvey(id)
    .then(onIndexSurvey)
    .catch(ui.deleteSurveySuccess)
}

// opens a modal for responding to survey
const onRespondSurveyButton = event => {
  event.preventDefault()

  const id = $(event.target).data().id

  api.showSurvey(id)
    .then(ui.loadRespondSurvey)
    .catch(ui.showSurveySuccess)
}

// retrieve answer from form and process into an object
// send the object and survey ID to API to update the response
const onAnswerSurvey = event => {
  event.preventDefault()

  const data = getFormFields(event.target)

  const surveyId = data.survey.id
  delete data.survey

  const questionsArray = []
  for (const key in data) {
    const obj = data[key]
    questionsArray.push(obj)
  }

  const responsePojo = {
    answers: questionsArray
  }

  api.answerSurvey(surveyId, responsePojo)
    .then(ui.answerSurveySuccess)
    .catch(ui.answerSurveySuccess)
}

// displays survey results chart
const onViewResults = event => {
  event.preventDefault()

  const id = $(event.target).data().id

  api.showSurvey(id)
    .then(ui.showSurveyResults)
    .catch(ui.showSurveySuccess)
}

const addHandlers = () => {
  $('header').on('click', '#all-surveys-link', event => onIndexSurvey(event, 'all'))
  $('header').on('click', '#my-surveys-link', event => onIndexSurvey(event, 'my'))
  $('main').on('submit', '#create-survey', onCreateSurvey)
  $('main').on('submit', '#update-survey', onUpdateSurvey)
  $('main').on('submit', '#survey-form', onAnswerSurvey)
  $('body').on('click', '.create-btn', onCreateSurveyButton)
  $('main').on('click', '.edit-btn', onEditSurveyButton)
  $('main').on('click', '.delete-btn', onDeleteSurvey)
  $('main').on('click', '.respond-btn', onRespondSurveyButton)
  $('main').on('click', '.results-btn', onViewResults)
  socket.on('message', onSocketIndex) // listens for an event from the server with the label 'message'
}

module.exports = {
  onIndexSurvey, // show all surveys
  onSocketIndex,
  onCreateSurveyButton,
  onCreateSurvey, // create survey
  onEditSurveyButton, // open modal to update survey
  onUpdateSurvey, // API call to update survey
  onDeleteSurvey, // delete survey
  onRespondSurveyButton, // open modal to answer survey
  onAnswerSurvey, // API call to answer survey
  onViewResults, // show survey results chart
  addHandlers
}
