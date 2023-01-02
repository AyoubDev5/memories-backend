import mongoose from 'mongoose';

const schema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default:0,
    },
    createAt: {
        type: Date,
        default: new Date(),
    },

})

const postMessage = mongoose.model('postMessage', schema);

export default postMessage;