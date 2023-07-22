
const { Response } = require('../utilities/response.js');
const { checkAuth, login } = require('../controllers/auth.js');

function router(req, res) {
    const { headers, url, method } = req;
    // const method = req.
    const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);

    let checkRoute = function (r_method, r_url) {
        return method === r_method && url === r_url;
    }

    switch (true) {
        case checkRoute('GET', '/blogs'):
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(Response.make("blogs", Response.HTTP_NOT_FOUND));
            break;
        case checkRoute('GET', '/blog/:id'):
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(Response.make("blog", Response.HTTP_NOT_FOUND));
            break;


        case checkRoute('PUT', '/blog'):
            checkAuth(req, res, () => {
                // The checkAuth function will call this callback if the token is valid
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(Response.make(
                    { message: 'Welcome! You are a logged-in user. This message is only visible to authenticated users.' },
                    Response.HTTP_OK
                ));
            });

        case checkRoute('POST', '/login'):
            login(req, res);
            break;

        default:
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(Response.make("404", Response.HTTP_NOT_FOUND));
            break;
    }
}



exports.router = router;