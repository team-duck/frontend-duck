'use strict'

const store = require('./../store')
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
}

const signUpSuccess = response => {
  const action = ['signUp', 'danger', 'success']
  handleResponse(response, action)
  $('form').trigger('reset')
}

const signInSuccess = response => {
  const action = ['signIn', 'danger', 'success']
  handleResponse(response, action, () => {
    // should bring in the function from on signedIn
    loadNavbar()
    loadMainPage()
    store.user = response.user
  })
  $('form').trigger('reset')
}

const changePasswordSuccess = response => {
  const action = ['changePassword', 'danger', 'success']
  handleResponse(response, action)
  $('form').trigger('reset')
}

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

module.exports = {
  loadNavbar,
  loadSplashPage,
  loadMainPage,
  signUpSuccess,
  signInSuccess,
  changePasswordSuccess,
  signOutSuccess
}
