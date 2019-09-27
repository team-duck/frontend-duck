'use strict'

// the format for keys is: actionName: ['failure string', 'success string']
const messages = {
  // auth messages
  signUp: ['Oh my! Something went wrong.  Try again.', 'Sweet! You\'re signed up.'],
  signIn: ['Booooooo... Something went wrong.  Try again.', 'You\'re signed in. Have fun!'],
  signOut: ['Oh my! Something went wrong.  Try again.', 'Sorry to see you go... Come back soon!'],
  changePassword: ['Something went wrong and your password was not changed.  Try again.', 'Done! Password changed.'],
  // clips messages
  createSurvey: ['Oh no! Something went wrong and your Survey wasn\'t saved', 'Your Survey was saved!'],
  deleteSurvey: ['Something went wrong, and your Survey wasn\'t deleted', 'Your Survey was successfully deleted!'],
  indexSurveys: ['Ooooh, there was a problem fetching your Surveys! Try again.', 'Your Surveys were retrieved successfully!'],
  updateSurvey: ['Oops! There was a problem and your Survey wasn\'t updated! Try again.', 'Your Survey was updated!']
}

module.exports = messages
