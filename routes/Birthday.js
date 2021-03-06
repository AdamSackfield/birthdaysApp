const Router = require('express').Router()
const Birthday = require('../models/Birthday')
const moment = require('moment')

// GET all Birthdays
Router.get('/birthdays', (req, res) => {
  Birthday.find({}, (err, birthdays) => {
    if(err) {
      res.json({
        success: false,
        message: 'Failed to GET Birthdays',
        err
      })
    }
    res.json({
      success: true,
      message: 'Listing all Birthdays',
      birthdays
    })
  })
})

// CREATE a new Birthday
Router.post('/new', (req, res) => {
  let newBirthday = new Birthday({
    name: req.body.name,
    birthday: req.body.birthday
  })

  newBirthday.save(newBirthday, (err, birthday) => {
    if(err) {
      res.json({
        success: false,
        message: 'Failed to CREATE Birthday',
        err
      })
    }
    res.json({
      success: true,
      message: 'Birthday Added',
      birthday
    })
  })
})

// DELETE a birthday
Router.delete('/delete', (req, res) => {
  Birthday.findByIdAndRemove(req.body._id, (err, birthday) => {
    if(err) {
      res.json({
        success: false,
        message: 'Failed to DELETE Birthday',
        err
      })
    }
    res.json({
      success: true,
      message: 'Birthday Removed',
      birthday
    })
  })
})

module.exports = Router