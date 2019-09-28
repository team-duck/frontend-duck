'use strict'

const store = require('./../store')
const surveyUi = require('./../survey/ui.js')
const handleResponse = require('./../common/handleResponse')
const navbarTemplate = require('./../templates/nav-bar-content.handlebars')
const splashPageTemplate = require('./../templates/splash-page/splash-body.handlebars')
const mainPageTemplate = require('./../templates/main-page/main-body.handlebars')
const emptyNavTemplate = require('./../templates/splash-page/empty-navbar.handlebars')

const loadNavbar = () => {
  const navbarHtml = navbarTemplate()
  $('header').html(navbarHtml)
}

const loadSplashPage = () => {
  const splashPageHtml = splashPageTemplate()
  $('main').html(splashPageHtml)
}

const loadMainPage = () => {
  const mainPageHtml = mainPageTemplate()
  $('main').html(mainPageHtml)
  surveyUi.loadCreateSurvey()
}

const signUpSuccess = response => {
  const action = ['signUp', 'danger', 'success']
  handleResponse(response, action)
  $('form').trigger('reset')
}

// const signUpFailure = () => {
//   $('form').trigger('reset')
//   $('#auth-status').text('Not signed up!')
// }

const signInSuccess = response => {
  const action = ['signIn', 'danger', 'success']
  handleResponse(response, action, () => {
    // should bring in the function sfrom on signedIn
    loadNavbar()
    loadMainPage()
    surveyUi.loadCreateSurvey()
    store.user = response.user
  })
  $('form').trigger('reset')
}

// const signInFailure = () => {
//   $('#auth-status').text('Not signed in!')
// }

const changePasswordSuccess = response => {
  const action = ['changePassword', 'danger', 'success']
  handleResponse(response, action)
  $('form').trigger('reset')
}

// const changePasswordFailure = () => {
//   $('form').trigger('reset')
//   $('#auth-status').text('Didnt change password!')
// }

const signOutSuccess = response => {
  const action = ['signOut', 'danger', 'info']
  handleResponse(response, action, () => {
    store.user = null
    const splashPageHtml = splashPageTemplate()
    $('main').html(splashPageHtml)
    const navbarHtml = emptyNavTemplate()
    $('header').html(navbarHtml)
  })
}

// const signOutFailure = () => {
//   $('#auth-status').text('Not signed out!')
// }

module.exports = {
  loadNavbar,
  loadSplashPage,
  loadMainPage,
  signUpSuccess,
  signInSuccess,
  changePasswordSuccess,
  signOutSuccess
}
