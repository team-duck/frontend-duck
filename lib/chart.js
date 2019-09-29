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
        // suffix: '%' we replace this suffix with interval one
        // so that it counts each response instead of percentage
        interval: 1,
        includeZero: true
      },
      axisX: {
        title: 'Responses'
      },
      data: [{
        type: 'column',
        yValueFormatString: '#,##0.0#' % '',
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
