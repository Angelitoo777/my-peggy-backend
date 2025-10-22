import mongoose from 'mongoose'

const { Schema } = mongoose

const settingsModel = new Schema({
  name: {
    type: String,
    default: 'configuracionGlobal',
    unique: true
  },
  tasaDolarBs: {
    type: Number,
    required: true,
    default: 225
  }
})

export const Settings = mongoose.model('Settings', settingsModel)
