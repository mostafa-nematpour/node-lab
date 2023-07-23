const { getAllBlog, getBlog, insertBlog, dropBlog } = require('../models/blog');
const { Response } = require('../utilities/response');


function blogs(req, res, next) {
    getAllBlog((blogs) => {

        if (blogs) {
            const blogList = blogs.map(item => makeBlog(item));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(Response.make(blogList, Response.HTTP_OK));
        } else {
            next(null);
        }

    });
}

function singleBlog(req, res, id) {
    getBlog(id, (blog) => {

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(Response.make(makeBlog(blog), Response.HTTP_OK));

    });
}

function addBlog(req, res) {

    let body = '';
    req.on('data', (data) => {
        body += data;
    });

    req.on('end', () => {
        const invalidFun = (res) => {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(Response.make(
                { message: 'Invalid information' },
                Response.HTTP_BAD_REQUEST
            ));
        }
        try {
            const blogData = { title, sub_title, slug, thumbnail, image, short_description, content, is_active, publish_at } = JSON.parse(body);
            blogData.author = req.user.id;

            insertBlog(blogData, (blog) => {

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(Response.make(
                    { blog: makeBlog(blog) },
                    Response.HTTP_OK
                ));

            })

        } catch (error) {
            console.log(error);
            invalidFun(res);
        }
    });
}

function deleteBlog(req, res, id) {

    dropBlog(id, (item) => {
        if (item.affectedRows === 1) {
            item.message = "deleted";
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(Response.make(
                { item },
                Response.HTTP_OK
            ));
        } else {
            item.message = "not deleted";
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(Response.make(
                { item },
                Response.HTTP_NOT_FOUND
            ));
        }
    });
    
}

function makeBlog(item) {
    return {
        id: item.blog_id,
        title: item.blog_title,
        sub_title: item.blog_sub_title,
        slug: item.blog_slug,
        thumbnail: item.blog_thumbnail,
        image: item.blog_image,
        short_description: item.blog_short_description,
        content: item.blog_content,
        updated_at: item.blog_updated_at,
        create_at: item.blog_create_at,
        author: {
            id: item.user_id,
            name: item.user_name
        }
    }
}


module.exports.blogs = blogs;
module.exports.singleBlog = singleBlog;
module.exports.addBlog = addBlog;
module.exports.deleteBlog = deleteBlog;