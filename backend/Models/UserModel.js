import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
name: {type: String, required:true},
email:{type:String,required :true, unique:true},
password:{type:String, required:true},
cartData:{type:Object,default:{}},
otp:{},
isVerified  : {type : Boolean , default : false},
// userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// address: { type: String, required: true },
// phone: { type: Number, required: true },
// zipcode: { type: String },
// additionalInfo: { type: String },

},{minimize: false})
//minimize- removing empty objects

const userModel = mongoose.model('User',userSchema)
export default userModel;