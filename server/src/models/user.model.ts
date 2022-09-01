import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
interface IUser {
    username: string;
    name: string;
    email: string;
    password: string;
    profile_avatar_url: string;
    isAdmin: Boolean;
    versionKey: Boolean;
    timestamps: Boolean;
    checkpassword: Function;
}

const userSchema = new Schema<IUser>({
    username:{type: String,required: true,unique: true},
    name: {type:String, required: true},
    email:{type:String, required:true, unique:true},
    password:{type:String,required:true},
    profile_avatar_url:{type: String,required:false,default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"},
    isAdmin: {
        type: Boolean,
        required:false,
        default: false,
      }
},
{
    versionKey: false,
    timestamps: true,
});

// it is called hook it run before saving in database

userSchema.pre("save", function (next) {
    // create and update
    if(!this.isModified("password")) return next();
    bcrypt.hash(this.password,10,(err,hash) => {
        this.password = hash;
        return next();
    });
});

userSchema.methods.checkpassword = function (password:string) {
    return new Promise((resolve,reject) => {
        bcrypt.compare(password,this.password, function(err,same) {
            if(err) return reject(err);

            return resolve(same);
        })
    })
}

const Users = model<IUser>("user", userSchema);
export default Users;
