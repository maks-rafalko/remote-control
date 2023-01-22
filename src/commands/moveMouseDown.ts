import { down, mouse } from '@nut-tree/nut-js';
import { CommandHandler } from './CommandHandler';
import { parseIntRadix10 } from '../extended-functions-api/parseIntRadix10';

const moveMouseDown: CommandHandler = async (args: string[]) => {
    const deltaPx = parseIntRadix10(args[0]!);
    await mouse.move(down(deltaPx));

    return `moved mouse down by ${deltaPx}px`;
};

export { moveMouseDown };
