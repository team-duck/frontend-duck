'use strict'

const api = require('./api')
const getFormFields = require('./../../../lib/get-form-fields')
const ui = require('./ui')
const { apiUrl } = require('../config')
const socket = require('socket.io-client')(apiUrl)
const store = require('../store')

const onIndexSurvey = event => {
  event.preventDefault()
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

const onCreateSurvey = event => {
  event.preventDefault()

  const data = getFormFields(event.target)

  const dataArray = []
  for (const key in data) {
    const obj = {}
    obj[key] = data[key]
    dataArray.push(obj)
  }

  const surveyPojo = {
    survey: {
      title: dataArray[0].survey.title,
      questions: []
    }
  }

  for (let i = 1; i < dataArray.length; i++) {
    const question = dataArray[i][`question${i}`]
    const questionPojo = {
      inputType: 'radio', // hard coded for now, need to revisit
      text: question.text,
      index: i - 1,
      responses: []
    }

    const optionsKeys = Object.keys(question).slice(1)
    for (let i = 0; i < optionsKeys.length; i++) {
      const optionPojo = {
        value: question[optionsKeys[i]],
        users: []
      }
      questionPojo.responses.push(optionPojo)
    }

    surveyPojo.survey.questions.push(questionPojo)
  }

  api.createSurvey(surveyPojo)
    .then(ui.createSurveySuccess)
    .catch(ui.createSurveyFailure)
}

const onShowSurvey = event => {
  event.preventDefault()

  const data = getFormFields(event.target)

  api.showSurvey(data.survey.id)
    .then(ui.showSurveySuccess)
    .catch(ui.showSurveyFailure)
}

const addHandlers = () => {
  $('main').on('click', '#index-surveys-button', onIndexSurvey)
  $('main').on('submit', '#show-survey', onShowSurvey)
  $('main').on('submit', '#create-survey', onCreateSurvey)
  socket.on('message', onSocketIndex) // listens for an event from the server with the label 'message'
}

module.exports = {
  onIndexSurvey,
  onShowSurvey,
  onCreateSurvey,
  addHandlers
}
