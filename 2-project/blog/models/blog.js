const mysql = require('mysql2');
const { dbConfig } = require('../config');

// Function to get a user by their username
function getAllBlog(callback) {
    const connection = mysql.createConnection(dbConfig);

    connection.query('SELECT blogs.id AS blog_id, blogs.title AS blog_title, blogs.sub_title AS blog_sub_title, blogs.slug AS blog_slug, blogs.thumbnail AS blog_thumbnail, blogs.image AS blog_image, blogs.short_description AS blog_short_description, blogs.content AS blog_content, blogs.updated_at AS blog_updated_at, blogs.create_at AS blog_create_at, users.id AS user_id, users.name AS user_name FROM blogs INNER JOIN users ON blogs.author = users.id; ', [], (err, results) => {
        connection.end(); // Close the connection after the query

        if (err) {
            throw new Error(err);
        }

        if (results.length === 0) {
            return callback(null); // User not found
        }

        return callback(results);
    });
}

function getBlog(id, callback) {
    const connection = mysql.createConnection(dbConfig);

    connection.query('SELECT blogs.id AS blog_id, blogs.title AS blog_title, blogs.sub_title AS blog_sub_title, blogs.slug AS blog_slug, blogs.thumbnail AS blog_thumbnail, blogs.image AS blog_image, blogs.short_description AS blog_short_description, blogs.content AS blog_content, blogs.updated_at AS blog_updated_at, blogs.create_at AS blog_create_at, users.id AS user_id, users.name AS user_name FROM blogs INNER JOIN users ON blogs.author = users.id WHERE blogs.id = ?;', [id], (err, results) => {
        connection.end(); // Close the connection after the query

        if (err) {
            throw new Error(err);
        }

        if (results.length === 0) {
            return callback(null);
        }

        return callback(results[0]);
    });
}

function insertBlog(blogData, callback) {
    const connection = mysql.createConnection(dbConfig);

    try {
        // Define the SQL query
        const sql = `INSERT INTO blogs (title, sub_title, slug, thumbnail, image, short_description, content, is_active, publish_at, author) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        // Extract data from blogData object
        const {
            title, sub_title, slug, thumbnail, image, short_description, content, is_active, publish_at, author

        } = blogData;

        // Execute the query and insert the new blog entry
        connection.query(sql, [title, sub_title, slug, thumbnail, image, short_description, content, is_active, publish_at, author], (err, result) => {

            connection.end(); // Close the connection after the query

            if (err) {
                throw new Error(err);
            }
            console.log(result);
            getBlog(result.insertId, (blog) => {
                return callback(blog);
            })
        });

    } catch (error) {
        console.log(error);
    }
}

function dropBlog(id, callback) {

    const connection = mysql.createConnection(dbConfig);

    connection.query('DELETE FROM blogs WHERE `blogs`.`id` = ?;', [id], (err, result) => {
        connection.end(); // Close the connection after the query

        if (err) {
            throw new Error(err);
        }

        return callback({ affectedRows: result.affectedRows });
    });
}

module.exports.getAllBlog = getAllBlog;
module.exports.getBlog = getBlog;
module.exports.insertBlog = insertBlog;
module.exports.dropBlog = dropBlog;
