import mongoose, { Schema} from 'mongoose';

const userSchema = new Schema({

    name : {
        type : String,
        required: [true, 'Name is required']
    },

    email : {
        type : String,
        required : [true, 'Email is required'],
        unique : true
    },

    password : {
        type : String,
        required : [true, 'Password is required']
    },

    roles : {
        type : [String],
        enum : ['USER_ROLE', 'ADMIN_ROLE']
    },

    img : {
        type : String,
        enum : ['men1' , 'men2', 'men3', 'women1', 'women2', 'women3' ],
        required : false
    }
})

export const UserModel = mongoose.model('User', userSchema);
