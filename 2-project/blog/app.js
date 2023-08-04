const http = require('http');
const config = require('./config.js');
const { router } = require('./routers/router.js');
const { Response } = require('./utilities/response.js');


const server = http.createServer((req, res) => {
    try {
        router(req, res);
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        // res.end(Response.make('server error', 500));
        res.end(Response.make(error, Response.HTTP_INTERNAL_SERVER_ERROR));
        console.log(error);
    }

});


const PORT = config.appPORT || 3300;
server.listen(PORT,
    () => { console.log(`app running on port: ${config.appPORT}`) }
);