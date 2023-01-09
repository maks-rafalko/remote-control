import { WebSocket, WebSocketServer } from 'ws';
import { httpServer } from './http_server';
import { getCommand } from './commands';
import { assertNonNullish } from './asserts';

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);

httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({
    port: 8080,
});

wss.on('connection', async (ws: WebSocket) => {
    ws.on('message', async (data: Buffer) => {
        const fullCommand = data.toString();
        console.log('received: %s', fullCommand);

        const [commandName, ...args] = fullCommand.split(' ');

        assertNonNullish(commandName, 'Command name must not be nullish.');

        const commandHandler = getCommand(commandName);

        await commandHandler(args, ws);
    });
});
