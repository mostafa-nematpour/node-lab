
const { Response } = require('../utilities/response.js');
const { checkAuth, login } = require('../controllers/auth.js');
const { blogs, addBlog, deleteBlog } = require('../controllers/blog.js');
const { singleBlog } = require('../controllers/blog.js');
const { checkRoute, extractFromPattern } = require('../utilities/routerCheck.js')

function router(req, res) {
    switch (true) {

        case checkRoute(req, 'GET', '/blogs'):

            blogs(req, res);
            break;


        case checkRoute(req, 'GET', '/blog/:id', /^\/blog\/[a-zA-Z0-9_-]+$/):

            const id = extractFromPattern(req.url, /^\/blog\/(.+)$/);
            singleBlog(req, res, id)
            break;

        case checkRoute(req, 'DELETE', '/blog/:id', /^\/blog\/[a-zA-Z0-9_-]+$/):

            const d_id = extractFromPattern(req.url, /^\/blog\/(.+)$/);
            checkAuth(req, res, () => {
                deleteBlog(req, res, d_id)
            });
            break;


        case checkRoute(req, 'POST', '/blog'):

            checkAuth(req, res, () => {
                addBlog(req, res);
            });
            break;


        case checkRoute(req, 'POST', '/login'):
            login(req, res);
            break;

        default:
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(Response.make("404", Response.HTTP_NOT_FOUND));
            break;
    }
}



exports.router = router;