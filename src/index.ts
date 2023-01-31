import * as dotenv from 'dotenv';
import * as logger from './logger';
import { onProcessTermination } from './onProcessTermination';
import { listenWebSocketServer } from './websocket-server';
import { listenHttpServer } from './http-server';
import { getNumberEnvironmentVariable } from './dotenvHelpers';

dotenv.config();

const httpServerPort = getNumberEnvironmentVariable('HTTP_SERVER_PORT');
const webSocketServerPort = getNumberEnvironmentVariable('WEBSOCKET_SERVER_PORT');

const httpServer = listenHttpServer(httpServerPort);
const webSocketServer = listenWebSocketServer(webSocketServerPort);

onProcessTermination((signal: string, code: number) => {
    logger.debug(`Closing HTTP Server, clients connections and WebSocket Server... Got ${signal} signal with code ${code}.`);

    webSocketServer.clients.forEach((client) => {
        client.close();
    });

    webSocketServer.close();

    httpServer.close();
});
