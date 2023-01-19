import { left, mouse } from '@nut-tree/nut-js';
import { CommandHandler } from './CommandHandler';
import { easingFunction } from './easingFunction';
import { parseIntRadix10 } from '../extended-functions-api/parseIntRadix10';

const moveMouseLeft: CommandHandler = async (args: string[]) => {
    const deltaPx = parseIntRadix10(args[0]!);
    await mouse.move(left(deltaPx), easingFunction);

    return `moved mouse left by ${deltaPx}px`;
};

export { moveMouseLeft };
