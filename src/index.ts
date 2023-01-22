import { createWebSocketStream, WebSocket, WebSocketServer } from 'ws';
import { httpServer } from './http-server';
import { getCommand } from './commands';
import { assertNonNullish } from './asserts';
import * as logger from './logger';
import { nodeCleanup } from './nodeCleanup';
import * as dotenv from 'dotenv';

dotenv.config();

assertNonNullish(process.env['HTTP_SERVER_PORT'], 'HTTP port must be a number.');
const httpServerPort = parseInt(process.env['HTTP_SERVER_PORT']);

assertNonNullish(process.env['WEBSOCKET_SERVER_PORT'], 'WebSocket port must be a number.');
const webSocketServerPort = parseInt(process.env['WEBSOCKET_SERVER_PORT']);

logger.debug(`Start static http server on the ${httpServerPort} port.`);
httpServer.listen(httpServerPort);

logger.debug(`Start WebSocket server on the ${webSocketServerPort} port.`);
const wss = new WebSocketServer({ port: webSocketServerPort });

wss.on('connection', async (ws: WebSocket) => {
    logger.debug('New WebSocket client has been connected to WebSocket Server.');

    const duplex = createWebSocketStream(ws, {
        decodeStrings: false,
        encoding: 'utf8',
    });

    duplex.on('data', async (fullCommand: string) => {
        try {
            logger.debug(`\nReceived command: ${fullCommand}`);

            const [commandName, ...args] = fullCommand.split(' ');

            assertNonNullish(commandName, 'Command name must not be nullish.');

            const commandHandler = getCommand(commandName);

            const commandResult = await commandHandler(args, duplex);

            logger.debug(`Command result: ${commandResult}\n`);
        } catch (error: any) {
            logger.error(error.message);
        }
    });

    ws.on('close', () => {
        logger.debug('WebSocket client has been disconnected from WebSocket Server.');
    });
});

nodeCleanup((signal: string, code: number) => {
    logger.debug(`Closing clients connections and WebSocket Server... Got ${signal} signal with code ${code}.`);

    wss.clients.forEach((client) => {
        client.close();
    });

    wss.close();
});
