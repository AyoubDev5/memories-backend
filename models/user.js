import mongoose from 'mongoose';

const schema = mongoose.Schema({
    name: {type:String, require:true},
    email: {type:String, require:true},
    password: {type:String, require:true},
    id: {type:String},

})

const user = mongoose.model('User', schema);

export default user;