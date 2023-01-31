import { createWebSocketStream, WebSocket, WebSocketServer } from 'ws';
import * as logger from '../logger';
import { assertNonNullish } from '../asserts';
import { getCommand } from '../commands';

const listenWebSocketServer = (port: number): WebSocketServer => {
    logger.debug(`Start WebSocket server on the ${port} port.`);

    const wss = new WebSocketServer({ port });

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

    return wss;
};

export { listenWebSocketServer };
