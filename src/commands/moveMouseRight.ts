import { mouse, right } from '@nut-tree/nut-js';
import { CommandHandler } from './CommandHandler';
import { easingFunction } from './easingFunction';
import { parseIntRadix10 } from '../extended-functions-api/parseIntRadix10';

const moveMouseRight: CommandHandler = async (args: string[]) => {
    const deltaPx = parseIntRadix10(args[0]!);

    await mouse.move(right(deltaPx), easingFunction);

    return `moved mouse right by ${deltaPx}px`;
};

export { moveMouseRight };
