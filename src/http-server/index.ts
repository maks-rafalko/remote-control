import * as fs from 'node:fs';
import * as path from 'node:path';
import * as http from 'node:http';
import * as logger from '../logger';

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

const listenHttpServer = (port: number): http.Server => {
    logger.debug(`Start static http server on the ${port} port.`);

    httpServer.listen(port);

    return httpServer;
};

export { listenHttpServer };
