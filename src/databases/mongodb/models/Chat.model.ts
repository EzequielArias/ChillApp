import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Esto asume que 'User' es el modelo de usuario al que te refieres
    },
    text: String
});

const chatSchema = new Schema({
    owners : {
        type : [mongoose.Types.ObjectId, mongoose.Types.ObjectId],
        ref : 'User'
    },

    messages : {
        type : [messageSchema]
    }
})

export const ChatModel = mongoose.model('Chat', chatSchema);
export const MsgSchema = mongoose.model('Message', messageSchema);