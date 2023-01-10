import { WebSocket } from 'ws';
import { mouse } from '@nut-tree/nut-js';
import { CommandHandler } from './CommandHandler';

const sendMousePosition: CommandHandler = async (_: string[], ws: WebSocket) => {
    const position = await mouse.getPosition();

    ws.send(`mouse_position ${position.x},${position.y}`);
};

export { sendMousePosition };
