'use strict'

const store = require('./../store')
const authAccordionTemplate = require('./../templates/auth-accordion.handlebars')
const userControlsTemplate = require('./../templates/user-controls.handlebars')
const jumbotronTemplate = require('./../templates/jumbotron.handlebars')

const loadAuthAccordion = () => {
  const authAccordionHtml = authAccordionTemplate()
  $('main').append(authAccordionHtml)
}

const loadUserControls = () => {
  const userControlsHtml = userControlsTemplate()
  $('main').append(userControlsHtml)
}

const loadJumbotron = () => {
  const loadJumbotronHtml = jumbotronTemplate()
  $('main').append(loadJumbotronHtml)
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
  $('#auth-status').text('Signed out!')
}

const signOutFailure = () => {
  $('#auth-status').text('Not signed out!')
}

module.exports = {
  loadAuthAccordion,
  loadUserControls,
  loadJumbotron,
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
