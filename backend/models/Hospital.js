import mongoose from 'mongoose';

const hospitalSchema = mongoose.Schema({
  name: {type: string, required: true},
  email: {type: string, required: true},
  password: {type: string, required: true},
  hospital: {type: string, required: true},
  created: {type: Date, required: false, default: Date.now}
});

export const Hospital = mongoose.model('Hospital', hospitalSchema);
