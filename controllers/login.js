const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

loginRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, password } = body

  const user = await User.findOne({ username })

  const correctPassword = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!correctPassword) {
    response.status(401).json({
      error: 'invalid user or password'
    })
  }

  response.send({
    name: user.name,
    username: user.username
  })
})

module.exports = loginRouter
