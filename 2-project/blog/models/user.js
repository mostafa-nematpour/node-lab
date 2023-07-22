const mysql = require('mysql2');
const { dbConfig } = require('../config');

// Function to get a user by their username
function getUserByUsername(username, callback) {
    const connection = mysql.createConnection(dbConfig);

    connection.query('SELECT * FROM users WHERE email = ?', [username], (err, results) => {
        connection.end(); // Close the connection after the query

        if (err) {
            return callback(err, null);
        }

        if (results.length === 0) {
            return callback(null, null); // User not found
        }

        const user = results[0];
        return callback(null, user);
    });
}

module.exports.getUserByUsername = getUserByUsername;

// // Usage example:
// const username = 'user1'; // Replace with the desired username
// getUserByUsername(username, (err, user) => {
//     if (err) {
//         console.error('Error:', err.message);
//     } else {
//         if (user) {
//             console.log('User found:', user);
//         } else {
//             console.log('User not found.');
//         }
//     }
// });
