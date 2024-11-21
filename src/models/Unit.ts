import { Schema, model } from 'mongoose';

const unitSchema = new Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  categoryID: { type: String, required: false },
  roleID: { type: String, required: false },
});

export default model('Units', unitSchema);
