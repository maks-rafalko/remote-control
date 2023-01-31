import { mouse } from '@nut-tree/nut-js';
import { Duplex } from 'stream';
import { CommandHandler } from './CommandHandler';

const sendMousePosition: CommandHandler = async (_: string[], webSocketStream: Duplex): Promise<string> => {
    const position = await mouse.getPosition();

    const commandResponse = `mouse_position ${position.x},${position.y}`;

    webSocketStream.write(commandResponse);

    return commandResponse;
};

export { sendMousePosition };
