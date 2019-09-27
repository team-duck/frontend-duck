'use strict'

const api = require('./api')
const getFormFields = require('./../../../lib/get-form-fields')
const authUi = require('./ui')
const surveyUi = require('./../survey/ui')

const onLoad = () => {
  authUi.loadSplashPage()
}

const onSignedIn = () => {
  authUi.loadNavbar()
  authUi.loadMainPage()
  surveyUi.loadCreateSurvey()
}

const onSignUp = event => {
  event.preventDefault()

  const data = getFormFields(event.target)

  api.signUp(data)
    .then(authUi.signUpSuccess)
    .catch(authUi.signUpFailure)
}

const onSignIn = event => {
  event.preventDefault()

  const data = getFormFields(event.target)

  api.signIn(data)
    .then(authUi.signInSuccess)
    .then(() => onSignedIn())
    .catch(authUi.signInFailure)
}

const onChangePassword = event => {
  event.preventDefault()

  const data = getFormFields(event.target)

  api.changePassword(data)
    .then(authUi.changePasswordSuccess)
    .catch(authUi.changePasswordFailure)
}

const onSignOut = event => {
  event.preventDefault()

  api.signOut()
    .then(authUi.signOutSuccess)
    .catch(authUi.signOutFailure)
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('nav').on('click', '#signout-button', onSignOut)
  $('#home-link').onclick = authUi.loadMainPage
}

module.exports = {
  onLoad,
  onSignedIn,
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  addHandlers
}
