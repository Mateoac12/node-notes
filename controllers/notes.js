const notesRouter = require('express').Router()
const Note = require('../models/Note')
const User = require('../models/User')

// get all notes
notesRouter.get('/', async (_, response) => {
  await Note.find({})
    .then(notes => {
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
notesRouter.post('/', async (request, response) => {
  const { body } = request
  const { content, important = false, userId } = body

  const user = await User.findById(userId)

  const newNote = new Note({
    content,
    date: new Date(),
    important,
    userId: user._id
  })

  await newNote.save()
    .then(notes => {
      user.notes = user.notes.concat(newNote)
      user.save()

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
