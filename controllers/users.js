const usersRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

// create user
usersRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, name, password } = body

  const checkUserExist = await User.findOne({ username })

  if (checkUserExist !== null) {
    response.status(406).json({
      error: 'Not posible create this user with this username, try use other'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    username,
    name,
    passwordHash
  })

  await newUser.save()
    .then(user => {
      response.json(user)
    })
})

// get all users
usersRouter.get('/', (_, response) => {
  User.find({}).populate('notes', { content: 1, date: 1, important: 1 })
    .then(users => {
      response.json(users)
    })
})

module.exports = usersRouter
