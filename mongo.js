require('dotenv').config()
const mongoose = require('mongoose')

const DB_URI = process.env.MONGO_DB_URI

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true

})
  .then(() => console.log('Conextion is OK'))
  .catch((err) => console.error(err))

/* const note = new Note({
  content: 'Arreglo de la propiedad important en las notas que se estaban mandando, dale like!',
  date: new Date(),
  important: true
})

note.save()
  .then(() => {
    console.log(note)
    mongoose.connection.close()
  })
  .catch((err) => {
    console.error(err)
  }) */
