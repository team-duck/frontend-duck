'use strict'

const store = require('./../store')
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

const signUpSuccess = () => {
  $('#auth-status').text('Signed up!')
}

const signUpFailure = () => {
  $('#auth-status').text('Not signed up!')
}

const signInSuccess = data => {
  store.user = data.user
  $('#auth-status').text('Signed in!')
}

const signInFailure = () => {
  $('#auth-status').text('Not signed in!')
}

const changePasswordSuccess = data => {
  $('#auth-status').text('Changed password!')
}

const changePasswordFailure = () => {
  $('#auth-status').text('Didnt change password!')
}

const signOutSuccess = data => {
  store.user = null
  const splashPageHtml = splashPageTemplate()
  $('main').html(splashPageHtml)
  const navbarHtml = emptyNavTemplate()
  $('header').html(navbarHtml)
}

const signOutFailure = () => {
  $('#auth-status').text('Not signed out!')
}

module.exports = {
  loadNavbar,
  loadSplashPage,
  loadMainPage,
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
