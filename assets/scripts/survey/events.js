'use strict'

const api = require('./api')
const getFormFields = require('./../../../lib/get-form-fields')
const ui = require('./ui')

const onIndexSurvey = event => {
  event.preventDefault()

  api.indexSurvey()
    .then(ui.indexSurveySuccess)
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

const addHandlers = () => {
  $('#index-surveys-button').on('click', onIndexSurvey)
  $('#create-survey').on('submit', onCreateSurvey)
}

module.exports = {
  onIndexSurvey,
  onCreateSurvey,
  addHandlers
}
