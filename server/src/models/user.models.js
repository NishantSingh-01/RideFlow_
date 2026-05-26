import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: [true, "Firstname is required"],
            minlength: [3, "Name must be at least 3 characters"]
        },
        lastname: {
            type: String
        }
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false
    },
    role:{
      type:String,
      enum:['rider','driver','admin'],
      default:'rider'
    },
    profilePhoto:{
      type:String,
      default:""
    },
    socketId: {
        type: String
    }

}, { timestamps: true })

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
})
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY
    }
  );
}
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema)
export default User