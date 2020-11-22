import { Schema, model } from 'mongoose'

const celebritySchema = Schema({
  name: {
    type: String,
    required: true
  },
  avatarPath: String
})

const Celebrity =  model('Celebrity', celebritySchema)
export default Celebrity