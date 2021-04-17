module.exports = (error, request, response, next) => {
  const nameError = error.name
  switch (nameError) {
    case 'CastError':
      response.status(400).send({ error: 'Bad request' })
      break
    default:
      response.status(500).send({ error: 'Internet server error' })
  }
}
