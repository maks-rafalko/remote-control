import { down, mouse } from '@nut-tree/nut-js';
import { CommandHandler } from './CommandHandler';
import { easingFunction } from './easingFunction';
import { parseIntRadix10 } from '../extended-functions-api/parseIntRadix10';

const moveMouseDown: CommandHandler = async (args: string[]) => {
    const deltaPx = parseIntRadix10(args[0]!);
    await mouse.move(down(deltaPx), easingFunction);

    return `moved mouse down by ${deltaPx}px`;
};

export { moveMouseDown };
