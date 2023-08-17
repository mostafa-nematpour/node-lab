const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const jwt = require("jsonwebtoken");
const secretKey = "secret";

const dummyDB = require("../database/dummyDB");

const { createHash } = require('crypto');





const extractor = (req) => {
    let token = null;
    if (req.headers.authorization) {
        token = req.headers.authorization.replace('Bearer ', '');
    }
    return token;
}


passport.use(new JwtStrategy({
    jwtFromRequest: extractor,
    secretOrKey: secretKey
}, (payload, done) => {
    // Lookup user details
    dummyDB.findById(payload.sub)
        .then(user => {
            return done(null, user);
        })
        .catch(err => {
            return done(err);
        });
}));

module.exports.login = (req, res) => {
    const user = req.user;
    console.log("111111111111111111111");
    console.log(user);


    // Create JWT payload
    const payload = {
        sub: user._id,
        username: user.username
    };
    console.log(payload);

    // Create JWT
    const token = jwt.sign(payload, 'secret');

    return res.json({ token });
}

function hash(string) {
    return createHash('sha256').update(string).digest('hex');
}