import { createWebSocketStream, WebSocket, WebSocketServer } from 'ws';
import { httpServer } from './http-server';
import { getCommand } from './commands';
import { assertNonNullish } from './asserts';
import * as logger from './logger';

const HTTP_PORT = 8181;
const WS_PORT = 8080;

logger.debug(`Start static http server on the ${HTTP_PORT} port.`);
httpServer.listen(HTTP_PORT);

logger.debug(`Start WebSocket server on the ${WS_PORT} port.`);
const wss = new WebSocketServer({ port: WS_PORT });

wss.on('connection', async (ws: WebSocket) => {
    const duplex = createWebSocketStream(ws, {
        decodeStrings: false,
        encoding: 'utf8',
    });

    duplex.on('data', async (fullCommand: string) => {
        try {
            logger.debug(`received: ${fullCommand}`);

            const [commandName, ...args] = fullCommand.split(' ');

            assertNonNullish(commandName, 'Command name must not be nullish.');

            const commandHandler = getCommand(commandName);

            await commandHandler(args, duplex);
        } catch (error: any) {
            logger.error(error.message);
        }
    });

    duplex.on('close', () => {
        logger.debug('Closing WS Server.');
        wss.close();
    });
});
