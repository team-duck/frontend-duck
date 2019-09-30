'use strict'
const store = require('../../store')
// check whether the owner of the survey is the signed in user
const hasAnswered = id => store.user.answeredSurveys.indexOf(id) !== -1 ? 'disabled' : ''
module.exports = hasAnswered
