const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
  const authorization = request.get('authorization')

  let token = ''
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  let decodedToken = {}
  try {
    decodedToken = jwt.verify(token, process.env.SECRET)
  } catch {}

  if (!token || !decodedToken.id) {
    response.status(401).send({
      error: 'token missing or invalid'
    })
  }

  const { id: userId } = decodedToken

  request.userId = userId // coloca en la request el userId (se puede hacer porque la request es un objeto y por tanto es mutable)

  next() // envia a la siguiente operacion dentro de los parametro del controller
}
