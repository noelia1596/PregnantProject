'use strict';
// import the necessary modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MODEL_NAME = "usuario"; // Mongoose will look for collection with plural of this

const UsuarioSchema = new Schema({
    name: String,
    password : String,
  created_at: Date,
  updated_at: Date,
});
/**
 * Before saving, we need to complete some data
 */
UsuarioSchema.pre('save', function(next) {
  const now = new Date();
  this.updated_at = now;
  if (!this.created_at) { // new element
    this.created_at = now;
  }
  this.enabled = true;
  next(); // Continue saving process. Otherwise it will hang
})

const model = mongoose.model(MODEL_NAME, UsuarioSchema);//el esquema que he guardado me lo guardas con la clave, que es usuario(model_name)
function toJSON(obj) {
  return  {
    name: obj.name,
    password: obj.password,
  }
}


module.exports = {
  model:model,
  toJSON,
};