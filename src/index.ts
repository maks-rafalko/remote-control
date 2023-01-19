import { createWebSocketStream, WebSocket, WebSocketServer } from 'ws';
import { httpServer } from './http-server';
import { getCommand } from './commands';
import { assertNonNullish } from './asserts';
import * as logger from './logger';
import { nodeCleanup } from './nodeCleanup';

const HTTP_PORT = 8181;
const WS_PORT = 8080;

logger.debug(`Start static http server on the ${HTTP_PORT} port.`);
httpServer.listen(HTTP_PORT);

logger.debug(`Start WebSocket server on the ${WS_PORT} port.`);
const wss = new WebSocketServer({ port: WS_PORT });

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
