require('dotenv').config()
require('./mongo')

const express = require('express')
const { json } = require('express')
const cors = require('cors')

const Note = require('./models/Note.js')
const handleErrors = require('./middleware/handleErrors')
const usersRouter = require('./controllers/users')
const notesRouter = require('./controllers/notes')

const app = express()

app.use(cors())
app.use(json())

app.get('/', (_, response) => {
  response.send('Home de la api')
})

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)

app.use((_, response) => {
  response.status(404).end()
})

app.use(handleErrors)

const PORT = '3001'
app.listen(PORT, () => {
  console.log('Servidor listo para usarse')
})
