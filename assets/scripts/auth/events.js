'use strict'

const api = require('./api')
const getFormFields = require('./../../../lib/get-form-fields')
const ui = require('./ui')
const surveyEvents = require('./../survey/events')

const onLoad = () => {
  ui.loadSplashPage()
}

const onSignUp = event => {
  event.preventDefault()

  const data = getFormFields(event.target)

  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpSuccess)
}

const onSignIn = event => {
  event.preventDefault()

  const data = getFormFields(event.target)

  api.signIn(data)
    .then(ui.signInSuccess)
    .then(() => {
      surveyEvents.onIndexSurvey(null, 'signIn')
    })
    .catch(ui.signInSuccess)
}

const onChangePassword = event => {
  event.preventDefault()

  const data = getFormFields(event.target)

  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordSuccess)
}

const onSignOut = event => {
  event.preventDefault()
  $('#chartContainer').hide()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutSuccess)
}

const addHandlers = () => {
  $('main').on('submit', '#sign-up', onSignUp)
  $('main').on('submit', '#sign-in', onSignIn)
  $('header').on('submit', '#change-password', onChangePassword)
  $('header').on('click', '#signout-button', onSignOut)
  $('header').on('click', '#home-link', ui.loadMainPage)
}

module.exports = {
  onLoad,
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  addHandlers
}
