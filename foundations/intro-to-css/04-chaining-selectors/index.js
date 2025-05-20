/**
 * Basic Node.js HTTP Server Template
 * This server handles static file serving and basic routing
 */

// Import required Node.js built-in modules
const http = require('http');  // For creating HTTP server
const fs = require('fs');      // For file system operations
const path = require('path');  // For handling file paths
const port = 3000;            // Server port number

// Create HTTP server instance
const server = http.createServer((req, res) => {
    // Handle the root path - serve index.html for root URL
    let filePath = req.url === '/' ? 'index.html' : req.url.slice(1);
    
    // Get the file extension to determine content type
    const extname = path.extname(filePath);
    let contentType = 'text/html';  // Default content type
    
    // Set appropriate content type based on file extension
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
    }

    // Read the requested file from the filesystem
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Handle 404 - File not found
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end('<h1>404 Not Found</h1>');
            } else {
                // Handle 500 - Server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success - Send file with appropriate content type
            res.writeHead(200, {'Content-Type': contentType});
            res.write(data);
            res.end();
        }
    });
});

// Start the server and listen on specified port
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});