import { left, mouse } from '@nut-tree/nut-js';
import { CommandHandler } from './CommandHandler';
import { easingFunction } from './easingFunction';
import { parseInt } from '../extended-functions-api/parseIntRadix10';

const moveMouseLeft: CommandHandler = async (args: string[]) => {
    const deltaPx = parseInt(args[0]!);
    await mouse.move(left(deltaPx), easingFunction);
};

export { moveMouseLeft };
