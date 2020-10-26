const User = require('../models/User');
const secretKey = require('../config/keys');
var jwt = require('jsonwebtoken');
const errorHandler = require('../utils/errorHandler');

module.exports.login = function (req,res) {
    User.findOne({ email: req.body.email }, function (err, user){
        if(err) throw err;

        if(!user){
            return res.status(401).send({success: false, msg: 'Пользователь не найден.'});
        }

        user.comparePassword(req.body.password, function (err, isMatch){
            if(isMatch && !err){
                const token = jwt.sign(user.toObject(), secretKey.jwt,{expiresIn: '25m'});
                return res.status(200).json({succes: true, token: 'JWT ' + token});
            }
            res.status(401).send({success: false, msg: 'Введен неверный пароль.'});
        });
    });
}

module.exports.register = async function (req,res){
    const findUser = await User.findOne({ email: req.body.email }, function (err, user){
        if(err) throw err;
        return user
    })

    if(!req.body.email || !req.body.password){
        return res.json({success: false, msg: 'Почта или пароль отсутствуют.'})
    }else if(findUser){
        return res.status(409).json({success: false, msg: 'Пользователь уже существует.'});
    }else {
        const newUser = new User(req.body);
        newUser.save(function (err){
            if(err){
                errorHandler(res, err)
            }
            res.status(201).json({succes: true, msg: 'Пользователь успешно создан.'});
        });
    }
}