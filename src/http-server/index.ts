import * as fs from 'node:fs';
import * as path from 'node:path';
import * as http from 'node:http';

const httpServer = http.createServer((req, res) => {
    const dirname = path.resolve(path.dirname(''));

    const filePath = dirname + (req.url === '/' ? '/front/index.html' : `/front${req.url}`);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }

        res.writeHead(200);
        res.end(data);
    });
});

export { httpServer };
