import { mouse, up } from '@nut-tree/nut-js';
import { CommandHandler } from './CommandHandler';
import { easingFunction } from './easingFunction';
import { parseInt } from '../extended-functions-api/parseIntRadix10';

const moveMouseUp: CommandHandler = async (args: string[]) => {
    const deltaPx = parseInt(args[0]!);

    await mouse.move(up(deltaPx), easingFunction);

    return `moved mouse up by ${deltaPx}px`;
};

export { moveMouseUp };
