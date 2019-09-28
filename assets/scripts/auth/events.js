'use strict'

const api = require('./api')
const getFormFields = require('./../../../lib/get-form-fields')
const authUi = require('./ui')
// const surveyUi = require('./../survey/ui')

const onLoad = () => {
  authUi.loadSplashPage()
}

// const onSignedIn = () => {
//   authUi.loadNavbar()
//   authUi.loadMainPage()
//   surveyUi.loadCreateSurvey()
// }

const onSignUp = event => {
  event.preventDefault()

  const data = getFormFields(event.target)

  api.signUp(data)
    .then(authUi.signUpSuccess)
    .catch(authUi.signUpSuccess)
}

const onSignIn = event => {
  event.preventDefault()

  const data = getFormFields(event.target)

  api.signIn(data)
    .then(authUi.signInSuccess)
    .catch(authUi.signInSuccess)
}

const onChangePassword = event => {
  event.preventDefault()

  const data = getFormFields(event.target)

  api.changePassword(data)
    .then(authUi.changePasswordSuccess)
    .catch(authUi.changePasswordSuccess)
}

const onSignOut = event => {
  event.preventDefault()

  api.signOut()
    .then(authUi.signOutSuccess)
    .catch(authUi.signOutSuccess)
}

const addHandlers = () => {
  $('main').on('submit', '#sign-up', onSignUp)
  $('main').on('submit', '#sign-in', onSignIn)
  $('main').on('submit', '#change-password', onChangePassword)
  $('header').on('click', '#signout-button', onSignOut)
  $('header').on('click', '#home-link', authUi.loadMainPage)
}

module.exports = {
  onLoad,
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  addHandlers
}
