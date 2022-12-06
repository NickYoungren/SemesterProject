import mongoose from "mongoose";
const Schema = mongoose.Schema;
let userSchema = new Schema({
   name:{
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   }
},{
   timestamps: true,
   collection: 'users'
})
let test = mongoose.model('User', userSchema);
export default test