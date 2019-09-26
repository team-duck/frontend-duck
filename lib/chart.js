'use strict'

window.onload = function () {

var options = {
	animationEnabled: true,
	title: {
		text: "Responses"
	},
	axisY: {
		title: "User responses (in %)",
		suffix: "%",
		includeZero: false
	},
	axisX: {
		title: "Responses"
	},
	data: [{
		type: "column",
		yValueFormatString: "#,##0.0#"%"",
		dataPoints: [
			{ label: answer.id, y: array.length }
      // i need to get each response from each user
		]
	}]
};

module.exports = options
