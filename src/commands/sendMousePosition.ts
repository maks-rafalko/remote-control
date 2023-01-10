import { mouse } from '@nut-tree/nut-js';
import { Duplex } from 'stream';
import { CommandHandler } from './CommandHandler';

const sendMousePosition: CommandHandler = async (_: string[], webSocketStream: Duplex) => {
    const position = await mouse.getPosition();

    webSocketStream.write(`mouse_position ${position.x},${position.y}`);
};

export { sendMousePosition };
