'use strict'

const store = require('./../store')
const signUpTemplate = require('./../templates/sign-up-form.handlebars')
const signInTemplate = require('./../templates/sign-in-form.handlebars')
const userControlsTemplate = require('./../templates/user-controls.handlebars')
const jumbotronTemplate = require('./../templates/jumbotron.handlebars')

const loadSignUp = () => {
  const signUpHtml = signUpTemplate()
  $('main').append(signUpHtml)
}

const loadSignIn = () => {
  const signInHtml = signInTemplate()
  $('main').append(signInHtml)
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
  loadSignUp,
  loadSignIn,
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
