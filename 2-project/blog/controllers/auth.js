const jwt = require('jsonwebtoken');
const { Response } = require('../utilities/response')
const { secretKey, KeyExpiresTime } = require('../config');
const { createHash } = require('crypto');
const { getUserByUsername } = require('../models/user');


function checkAuth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(Response.make(
            { message: 'Unauthorized - Bearer token missing' },
            Response.HTTP_UNAUTHORIZED
        ));
        return;
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(Response.make(
                { message: 'Invalid token' },
                Response.HTTP_UNAUTHORIZED
            ));
            return;
        }

        // add additional authorization logic here
        // checking user roles or permissions before proceeding

        // If everything is valid, you can attach the user's decoded data to the request object
        req.user = decoded;
        next();
    });
}

function login(req, res) {
    let body = '';
    req.on('data', (data) => {
        body += data;
    });

    req.on('end', () => {
        const invalidFun = (res) => {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(Response.make(
                { message: 'Invalid information' },
                Response.HTTP_UNAUTHORIZED
            ));
        }
        try {
            const { username, password } = JSON.parse(body);
            findUserByUsername(username, (user) => {
                if (!user || user.password !== hash(password)) {
                    invalidFun(res);
                    return;
                }
                const token = generateToken(user);
                delete user.password;
                delete user.created_at;
                delete user.update_at;
                delete user.email_verified_at;
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(Response.make(
                    { token: token, user: user },
                    Response.HTTP_OK
                ));
            });
        } catch (error) {
            // console.log(error);
            invalidFun(res);
        }

    });
}

// Helper function to find a user by username
function findUserByUsername(username, next) {
    getUserByUsername(username, (err, user) => {
        if (err) {
            throw new Error(err);
        } else {
            if (user) {
                // console.log(user);
                next(user);
            } else {
                next(null);
            }
        }
    });
}

// Helper function to generate a JWT
function generateToken(user) {
    return jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: KeyExpiresTime });
}

function hash(string) {
    return createHash('sha256').update(string).digest('hex');
}

module.exports.checkAuth = checkAuth;
module.exports.login = login;