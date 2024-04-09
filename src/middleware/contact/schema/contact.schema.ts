import mongoose from "mongoose";

const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const ContactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  message: {
    type: String,
    required: true,
  },
  policy: {
    type: Boolean,
    required: true,
  },
});

export default ContactSchema;
