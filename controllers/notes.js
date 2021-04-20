const notesRouter = require('express').Router()
const Note = require('../models/Note')

// get all notes
notesRouter.get('/', async (_, response) => {
  console.log(response)
  await Note.find({}).then(notes => {
    response.json(notes)
  })
})

// get single note
notesRouter.get('/:id', (request, response, next) => {
  const { id } = request.params
  Note.findById(id)
    .then(note => {
      response.send(note)
    })
    .catch((err) => next(err))
})

// remove single note
notesRouter.delete('/:id', (request, response, next) => {
  const { id } = request.params
  Note.findByIdAndRemove(id)
    .then(() => response.status(204).end())
    .catch(err => next(err))
})

// create a new note
notesRouter.post('/', (request, response) => {
  const bodyRequest = request.body

  const newNote = new Note({
    content: bodyRequest.content,
    date: new Date(),
    important: typeof bodyRequest.important !== 'undefined'
      ? bodyRequest.important
      : false
  })

  newNote.save()
    .then(notes => {
      response.json(notes)
    })
})

// update single note
notesRouter.put('/:id', (request, response) => {
  const { id } = request.params

  const newNoteUpdated = {
    content: request.body.content,
    important: request.body.important
  }

  Note.findByIdAndUpdate(id, newNoteUpdated, { new: true })
    .then(res => response.send(res))
})

module.exports = notesRouter
