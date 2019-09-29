'use strict'

const api = require('./api')
const getFormFields = require('./../../../lib/get-form-fields')
const ui = require('./ui')
const { apiUrl } = require('../config')
const socket = require('socket.io-client')(apiUrl)
const store = require('../store')
const processSurveyData = require('./../../../lib/process-survey-data')

const onIndexSurvey = event => {
  if (event) {
    event.preventDefault()
  }

  api.indexSurvey()
    .then(ui.indexSurveySuccess)
    .catch(ui.indexSurveyFailure)
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
    .catch(ui.indexSurveyFailure)
}

const onDeleteSurvey = event => {
  event.preventDefault()

  const id = $(event.target).data().id

  api.deleteSurvey(id)
    .then(onIndexSurvey)
    .catch(ui.indexSurveyFailure)
}

// opens a modal for editing the survey
const onEditSurvey = event => {
  event.preventDefault()

  const id = $(event.target).data().id

  api.showSurvey(id)
    .then(ui.updateSurveyModal)
    .catch(ui.updateSurveyFailure)
}

const onCreateSurvey = event => {
  event.preventDefault()

  const data = getFormFields(event.target)
  const surveyPojo = processSurveyData(data)

  api.createSurvey(surveyPojo)
    .then(ui.createSurveySuccess)
    .catch(ui.createSurveyFailure)
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
    .then(ui.updateSurveyModal)
    .catch(ui.updateSurveyFailure)
}

// displays survey results chart
const onViewResults = event => {
  event.preventDefault()

  const id = $(event.target).data().id

  api.showSurvey(id)
    .then(ui.showSurveyResults)
    .catch(ui.showSurveyFailure)
}

// opens a modal for responding to survey
const onRespondSurvey = event => {
  event.preventDefault()

  const id = $(event.target).data().id

  api.showSurvey(id) // open modal
    .then(ui.loadRespondSurvey) // change
    .catch(ui.showSurveyFailure) // change
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
    .then(console.log)
    .catch(console.error)
}

const addHandlers = () => {
  $('header').on('click', '#all-surveys-link', onIndexSurvey)
  $('main').on('submit', '#create-survey', onCreateSurvey)
  $('main').on('submit', '#update-survey', onUpdateSurvey)
  $('main').on('submit', '#survey-form', onAnswerSurvey)
  $('main').on('click', '.delete-btn', onDeleteSurvey)
  $('main').on('click', '.edit-btn', onEditSurvey)
  $('main').on('click', '.results-btn', onViewResults)
  $('main').on('click', '.respond-btn', onRespondSurvey)
  socket.on('message', onSocketIndex) // listens for an event from the server with the label 'message'
}

module.exports = {
  onIndexSurvey,
  onCreateSurvey,
  addHandlers
}
