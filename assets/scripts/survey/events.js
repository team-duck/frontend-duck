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
    .then(response => ui.indexSurveyHandler(response, type))
    .catch(ui.indexSurveyHandler)
}

const onSocketIndex = message => {
  // console.log('socket words', message)
  // expect store.view to be set by other functions, prevents
  onIndexSurvey(null)
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
    .then(ui.createSurveyHandler)
    .then(() => onIndexSurvey(null, 'my'))
    .catch(ui.createSurveyHandler)
}

// opens a modal for editing the survey
const onEditSurveyButton = event => {
  event.preventDefault()

  const id = $(event.target).data().id

  api.showSurvey(id)
    .then(ui.loadUpdateSurvey)
    .catch(ui.showSurveyHandler)
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
    .then(ui.updateSurveyHandler)
    .catch(ui.updateSurveyHandler)
}

const onDeleteSurvey = event => {
  event.preventDefault()

  const id = $(event.target).data().id

  api.deleteSurvey(id)
    .then(onIndexSurvey)
    .catch(ui.deleteSurveyHandler)
}

// opens a modal for responding to survey
const onRespondSurveyButton = event => {
  event.preventDefault()

  const id = $(event.target).data().id

  api.showSurvey(id)
    .then(ui.loadRespondSurvey)
    .catch(ui.showSurveyHandler)
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
    .then(ui.answerSurveyHandler)
    .then(() => onIndexSurvey(null))
    .catch(ui.answerSurveyHandler)
}

// displays survey results chart
const onViewResults = event => {
  event.preventDefault()
  store.view = 'results'
  const id = $(event.target).data().id

  api.showSurvey(id)
    .then(ui.showSurveyResults)
    .catch(ui.showSurveyHandler)
}
// goes to home page
const onHome = event => {
  event.preventDefault()
  store.view = 'main'
  onIndexSurvey(null, 'default')
}

const onViewAllSurveys = event => {
  event.preventDefault()
  store.view = 'index'
  onIndexSurvey(null, 'all')
}

const onViewMySurveys = event => {
  event.preventDefault()
  store.view = 'myIndex'
  onIndexSurvey(null, 'my')
}

const addHandlers = () => {
  $('header').on('click', '#all-surveys-link', onViewAllSurveys)
  $('header').on('click', '#my-surveys-link', onViewMySurveys)
  $('main').on('submit', '#create-survey', onCreateSurvey)
  $('main').on('submit', '#update-survey', onUpdateSurvey)
  $('main').on('submit', '#survey-form', onAnswerSurvey)
  $('body').on('click', '.create-btn', onCreateSurveyButton)
  $('main').on('click', '.edit-btn', onEditSurveyButton)
  $('main').on('click', '.delete-btn', onDeleteSurvey)
  $('main').on('click', '.respond-btn', onRespondSurveyButton)
  $('main').on('click', '.results-btn', onViewResults)
  $('header').on('click', '#home-link', onHome)
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
