const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
 
}

const userSchema = mongoose.Schema({
  email: reqString,
  searchHistory:[String]
})

module.exports = mongoose.model('users', userSchema)