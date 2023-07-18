// by chatGPT
const http = require('http');

// Create the HTTP server
const server = http.createServer((req, res) => {
    // Extract relevant request information
    const { headers, method, url } = req;
    const clientIp = req.socket.remoteAddress;
    const queryParams = new URLSearchParams(req.url.split('?')[1]); // Extract query parameters

    // Set the response header
    res.setHeader('Content-Type', 'application/json');

    let body = [];

    // Handle the request body
    req
        .on('data', (chunk) => {
            body.push(chunk);
        })
        .on('end', () => {
            body = Buffer.concat(body).toString();

            // Create the response object
            const response = {
                ip: clientIp,
                method,
                url,
                headers,
                queryParams: Object.fromEntries(queryParams),
                body: body ? JSON.parse(body) : null,
            };

            // Send the response as JSON
            res.statusCode = 200;
            res.end(JSON.stringify(response));
        });
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
