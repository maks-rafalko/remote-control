import { left, mouse } from '@nut-tree/nut-js';
import { CommandHandler } from './CommandHandler';
import { parseIntRadix10 } from '../extended-functions-api/parseIntRadix10';

const moveMouseLeft: CommandHandler = async (args: string[]) => {
    const deltaPx = parseIntRadix10(args[0]!);
    await mouse.move(left(deltaPx));

    return `moved mouse left by ${deltaPx}px`;
};

export { moveMouseLeft };
