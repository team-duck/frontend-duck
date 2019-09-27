'use strict'

const chartData = survey => {
  return survey.questions.map(question => {
    return {
      animationEnabled: true,
      title: {
        text: question.title
      },
      axisY: {
        title: 'User responses',
        suffix: '',
        includeZero: true
      },
      axisX: {
        title: 'Responses'
      },
      data: [{
        type: 'column',
        yValueFormatString: '#,##0.0#',
        dataPoints: question.responses.map(response => {
          return {
            label: response.value,
            y: response.users.length
          }
        })
      }]
    }
  })
}

module.exports = chartData
