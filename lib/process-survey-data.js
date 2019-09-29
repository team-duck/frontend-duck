'use strict'

const processSurveyData = (data) => {
  const dataArray = []
  for (const key in data) {
    const obj = {}
    obj[key] = data[key]
    dataArray.push(obj)
  }
  console.log('processing data', dataArray)
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
      index: i,
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

  console.log('returned pojo', surveyPojo)
  return surveyPojo
}

module.exports = processSurveyData
