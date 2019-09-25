'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const store = require('./store')
const authEvents = require('./auth/events')
const surveyEvents = require('./survey/events')

$(() => {
  store.user = null
  authEvents.addHandlers()
  surveyEvents.addHandlers()
})
