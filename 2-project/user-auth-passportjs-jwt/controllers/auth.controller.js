const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require("jsonwebtoken");
const dummyDB = require("../database/dummyDB");

const secretKey = "secret";



passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey
}, (payload, done) => {
    // Lookup user details
    var user = dummyDB.findById(payload.sub);
    console.log(user);
    if (user) {
        return done(null, user);
    } else {
        return done(null);
    }
}));

module.exports.login = (req, res) => {
    const user = req.body;

    if (!dummyDB.isValidUser(user.username, user.password)) {
        return res.json({ error: "not valid" });
    }

    // Create JWT payload
    const payload = {
        sub: user._id,
        username: user.username
    };

    // Create JWT
    const token = jwt.sign(payload, 'secret');

    return res.json({ token });
}
