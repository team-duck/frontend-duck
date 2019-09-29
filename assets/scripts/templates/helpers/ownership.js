'use strict'
const store = require('../../store')
// check whether the owner of the survey is the signed in user
const ownership = id => id === store.user._id

module.exports = ownership
