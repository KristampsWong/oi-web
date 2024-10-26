import mongoose, { models } from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { _id: false },
)

const conversationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  messages: [messageSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

const Conversation = models.Conversation || mongoose.model('Conversation', conversationSchema)

export default Conversation
// const mongoose = require("mongoose");

// // Define the Message Schema
// const messageSchema = new mongoose.Schema({
//   role: {
//     type: String,
//     enum: ["user", "assistant"],
//     required: true,
//   },
//   content: {
//     type: String,
//     required: true,
//   },
// }, { _id: false }); // Use _id: false to prevent creating a unique _id for each message

// // Define the Conversation Schema
// const conversationSchema = new mongoose.Schema({
//   userId: {
//     type: String,
//     required: true,
//   },
//   messages: {
//     type: [messageSchema], // This must reference the messageSchema properly
//     default: [],
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Create the Conversation Model
// const Conversation = mongoose.model("Conversation", conversationSchema);

// module.exports = Conversation;
