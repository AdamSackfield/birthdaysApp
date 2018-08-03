const mongoose = require('mongoose')

const BirthdaySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  birthday: {
    type: String,
    required: true
  }
})

const Birthday = module.exports = mongoose.model('Birthday', BirthdaySchema)