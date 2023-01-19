import { down, mouse } from '@nut-tree/nut-js';
import { CommandHandler } from './CommandHandler';
import { easingFunction } from './easingFunction';
import { parseInt } from '../extended-functions-api/parseIntRadix10';

const moveMouseDown: CommandHandler = async (args: string[]) => {
    const deltaPx = parseInt(args[0]!);
    await mouse.move(down(deltaPx), easingFunction);

    return `moved mouse down by ${deltaPx}px`;
};

export { moveMouseDown };
