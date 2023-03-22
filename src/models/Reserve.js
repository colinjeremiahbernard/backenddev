import { Schema, model, SchemaType } from 'mongoose';

const ReserveSchema = new Schema({
  date: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  house: {
    type: Schema.Types.ObjectId,
    ref: 'house'
  }
});
export default model('Reserve', ReserveSchema);