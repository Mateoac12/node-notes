require('dotenv').config() // sirve para poder usar variables de entorno
require('./mongo')

const express = require('express')
const cors = require('cors')
const { json } = require('express')

const handleErrors = require('./middleware/handleErrors')
const usersRouter = require('./controllers/users')
const notesRouter = require('./controllers/notes')
const loginRouter = require('./controllers/login')

const app = express()

app.use(cors()) // sirve para poder acceder a mi dominio desde otro path
app.use(json())

app.get('/', (_, response) => {
  response.send('Home de la api')
})

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/login', loginRouter)

app.use((_, response) => {
  response.status(404).end()
})

app.use(handleErrors)

const PORT = '3001'
app.listen(PORT, () => {
  console.log('Servidor listo para usarse')
})
