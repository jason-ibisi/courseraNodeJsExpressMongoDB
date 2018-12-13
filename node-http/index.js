const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(req.method + " Request - " + res.statusCode + " for " + req.url );

    if(req.method == 'GET') {
        var fileUrl;

        // check if request is for index or another file
        if(req.url == '/') fileUrl = '/index.html';
        else fileUrl = req.url;

        // Get full path of file requested
        var filePath = path.resolve('./public' + fileUrl);
        const fileExt = path.extname(filePath);
        if(fileExt == '.html') {
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><body><h1>Error 404: ' + fileUrl + ' not found</h1></body></html>');

                    return;
                }
                else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
                    // Read in file and send file out
                    fs.createReadStream(filePath).pipe(res);
                }
            })
        }
        else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>Error 404: ' + fileUrl + ' not an HTML file</h1></body></html>');

            return;
        }
    }
    else {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 405: ' + req.method + ' not supported</h1></body></html>');

        return;
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
