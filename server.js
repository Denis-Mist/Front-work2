const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 - Page dont found my :)</h1>');
            return;
        }

        // Определяем MIME-тип файла
        let contentType = 'text/html';
        if (filePath.endsWith('.css')) {
            contentType = 'text/css';
        }

        // Читаем и возвращаем файл
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 - Error</h1>');
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content);
            }
        });
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server start in  http://localhost:${PORT}`);
});