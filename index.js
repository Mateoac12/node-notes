require('dotenv').config()
require('./mongo')

const express = require('express')
const mongoose = require('mongoose')
const { json, response } = require('express')
const cors = require('cors')

const Note = require('./models/Note.js')
const handleErrors = require('./middleware/handleErrors')

const app = express()

app.use(cors())
app.use(json())

app.get('/', (_, response) => {
  response.send('Home de la api')
})

app.get('/api/notes', (_, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  Note.findById(id)
    .then(note => {
      response.send(note)
    })
    .catch((err) => next(err))
})

app.delete('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  Note.findByIdAndRemove(id)
    .then(() => response.status(204).end())
    .catch(err => next(err))
})

app.post('/api/notes', (request, response) => {
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

app.put('/api/notes/:id', (request, response) => {
  const { id } = request.params

  const newNoteUpdated = {
    content: request.body.content,
    important: request.body.important
  }

  Note.findByIdAndUpdate(id, newNoteUpdated, { new: true })
    .then(res => response.send(res))
})

app.use((request, response) => {
  response.status(404).end()
})

app.use(handleErrors)

const PORT = '3001'
app.listen(PORT, () => {
  console.log('Servidor listo para usarse')
})
