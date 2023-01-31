import { mouse, up } from '@nut-tree/nut-js';
import { CommandHandler } from './CommandHandler';
import { parseIntRadix10 } from '../extended-functions-api/parseIntRadix10';

const moveMouseUp: CommandHandler = async (args: string[]) => {
    const deltaPx = parseIntRadix10(args[0]!);

    await mouse.move(up(deltaPx));

    return `moved mouse up by ${deltaPx}px`;
};

export { moveMouseUp };
