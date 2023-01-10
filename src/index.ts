import { WebSocket, WebSocketServer } from 'ws';
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
    ws.on('message', async (data: Buffer) => {
        const fullCommand = data.toString();
        logger.debug(`received: ${fullCommand}`);

        const [commandName, ...args] = fullCommand.split(' ');

        assertNonNullish(commandName, 'Command name must not be nullish.');

        const commandHandler = getCommand(commandName);

        await commandHandler(args, ws);
    });
});
