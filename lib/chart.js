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
		title: "Countries"
	},
	data: [{
		type: "column",
		yValueFormatString: "#,##0.0#"%"",
		dataPoints: [
			{ label: answer.id, y: 10.09 },
			{ label: answer.id, y: 9.40 },
			{ label: answer.id, y: 8.50 },
			{ label: answer.id, y: 7.96 },
			{ label: answer.id, y: 7.80 },
			{ label: answer.id, y: 7.56 },
			{ label: answer.id, y: 7.20 },
			{ label: answer.id, y: 7.1 }

		]
	}]
};

module.exports = options
