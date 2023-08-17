const { createHash } = require('crypto');

const users =
    [
        {
            id: 1,
            userName: "mostafa",
            // password = 123
            password: "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3"
        }
    ]

module.exports.findById = (id) => {
    return users.find(item => item.id === id);
}

module.exports.isValidUser = (userName, password) => {
    let user = users.find(item => item.userName === userName);
    if (!user) {
        return false;
    }
    console.log(hash(password));
    if (user.password === hash(password)) {
        return true;
    }
    return false;
}

function hash(string) {
    return createHash('sha256').update(string).digest('hex');
}