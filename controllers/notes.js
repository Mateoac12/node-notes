const notesRouter = require('express').Router()
const Note = require('../models/Note')

notesRouter.get('/', async (_, response) => {
  console.log(response)
  await Note.find({}).then(notes => {
    response.json(notes)
  })
})

module.exports = notesRouter
