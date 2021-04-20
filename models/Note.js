const mongoose = require('mongoose')
const { Schema, model } = mongoose

const noteShema = new Schema({
  content: String,
  date: Date,
  important: Boolean,
  userId: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})

/*
cuando recibimos las notas, se hace un toJSON para que se puedan ver correctamente en el fron
esto se hace automaticamente, por lo que si queremos editar lo que llega al front como por ejemplo
el _id y cambiarlo por el id que si manejamos. debemos editar ese metodo que se aplica automaticamente
**/
noteShema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = model('Note', noteShema)

module.exports = Note
