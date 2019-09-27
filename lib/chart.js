'use strict'

window.onload = function () {
  const options = {
    animationEnabled: true,
    title: {
      text: 'Responses'
    },
    axisY: {
      title: 'Responses picked (times)',
      suffix: '%',
      includeZero: false
    },
    axisX: {
      title: 'Options'
    },
    data: [{
      type: 'column',
      yValueFormatString: '#,##0.0#',
      dataPoints: [{
        label: 'Ira',
        y: 10.09
      },
      {
        label: 'Turks & Caicos Islands',
        y: 9.40
      }
      ]
    }]
  }
}

// Function that tells us the number of times that user have picked a response(id?)
function howMany (selectObject) {
  let numberSelected = 0
  for (let i = 0; i < selectObject.options.length; i++) {
    if (selectObject.options[i].selected) {
      numberSelected++
    }
  }
  return numberSelected
}

// REMEMBER TO EXPORT ALL YOUR CONSTANTS
module.exports = {
  options,
  howMany
}
