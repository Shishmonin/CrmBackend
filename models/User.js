const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', function (next){
    var user = this;
    if(this.isModified('password') || this.isNew){
        bcrypt.genSalt(10, function (err, salt){
            if(err){
                return next()
            }
            bcrypt.hash(user.password, salt,null, function (err,hash){
                if(err){
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    }else {
        next();
    }
});

userSchema.methods.comparePassword = function (passw,cb){
    bcrypt.compare(passw, this.password, function (err, isMatch){
        if(err){
            return cb(err);
        }
        cb(null,isMatch);
    });
};

module.exports = mongoose.model('users', userSchema)