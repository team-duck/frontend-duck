'use strict'

const $messages = $('#messages')
// The showAlert function takes two arguments:
// 1. A message to display to the user
// 2. A Bootstrap Alert type (success, danger, info, etc.)

const showAlert = (message, type) => {
  // An HTML template that will be used for each
  // alert.  Classes from Animate.css will make it
  // slide in from the left with a bounce at the end.
  const alertTemplate = `
  <div class="alert-${type} alert alert-dismissible fade show animated bounceInLeft" role="alert">
    ${message}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`

  // We need to use the appendTo method instead of
  // append so we can chain an event listener to the
  // newly added alert.  Storing the appended element
  // in a variable makes it possible to also target it
  // to remove it from the DOM in the setTimeout
  const $alert = $(alertTemplate)
    .appendTo($messages)

  // Because we used appendTo the element jQuery returned
  // was the newly created individual alert.  This gives
  // us the ability to target it specifically adding
  // classes from Animate.css that fade out the alert after
  // 5 seconds.  We also add an event listener to wait for
  // the animation to be completed before removing the
  // alert element from the DOM.

  setTimeout(() => {
    $alert
      .addClass('animated fadeOutUp')
      .one('animationend', event => $(event.target).remove())
  }, 5000)
}

module.exports = showAlert
