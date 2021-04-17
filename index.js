require('dotenv').config()
require('./mongo')

const express = require('express')
const { json } = require('express')
const cors = require('cors')

const Note = require('./models/Note.js')

const app = express()

app.use(cors())
app.use(json())

// notes
let notes = [
  {
    id: 1,
    content: 'Holaa primer mensaje de las notas',
    date: '2021-04-16T17:34:47.261Z',
    important: true
  },
  {
    id: 2,
    content: 'Heyyy segunda nota',
    date: '2021-04-16T17:37:50.261Z',
    important: true
  },
  {
    id: 3,
    content: 'Esoo tercera nota',
    date: '2021-04-16T19:37:50.261Z',
    important: false
  }
]

app.get('/', (_, response) => {
  response.send('Home de la api')
})

app.get('/api/notes', (_, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  const { id } = request.params
  const searchSingleResult = notes.find(note => note.id === Number(id))
  if (typeof searchSingleResult !== 'undefined') {
    response.send(searchSingleResult)
  } else {
    response.send({
      error: 'not have this note with this ID. Please search with other number'
    })
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const { id } = request.params
  notes = notes.filter(note => note.id !== Number(id))
  response.send(notes)
})

app.post('/api/notes', (request, response) => {
  const bodyRequest = request.body
  const allIds = notes.map(({ id }) => id)
  const lastId = Math.max(...allIds)

  const newNote = {
    id: lastId + 1,
    content: bodyRequest.content,
    date: new Date().toISOString(),
    important: typeof bodyRequest.important !== 'undefined'
      ? bodyRequest.important
      : false
  }

  notes = [...notes, newNote]
  response.json(notes)
})

app.use((_, response) => {
  response.status(404).send({
    error: 'Not page found'
  })
})

const PORT = '3001'
app.listen(PORT, () => {
  console.log('Servidor listo para usarse')
})
